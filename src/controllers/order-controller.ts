import { NextFunction, Request, Response } from "express";
import { PictureModel , OrderModel ,PaymentModel , UserModel } from "../models";
import { TokenPayload } from "../types/token-payload";
import Razorpay from "razorpay";
import { PictureType } from "../types/picture-type";

import { UserType } from "../types/user-type";
import { RazorPayOrderResponse } from "../types/razorpay-order-response";
import { OrderType } from "../types/order-type";
import { isValidObjectId } from "mongoose";
const { KEY_ID, KEY_SECRET } = process.env;
var instance = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

export async function createOrder(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const pictureId = request.body.picture;
  const payload = <TokenPayload>(<any>request).payload;

  const picture = <PictureType>(
    await PictureModel.findById(pictureId).select("-highQualityImage")
  );
  console.log({ picture });
  console.log({ user: payload._id });
  const user = <UserType>await UserModel.findById(payload._id);

  const count = await OrderModel.find({
    user: user,
    picture: picture,
    orderStatus: "Success",
  }).countDocuments();

  if (count > 0) {
    response.status(400);
    return next(new Error("user already paid for this picture"));
  }

  const mrp = +picture.price;
  const discount = +picture.discount;
  const price = mrp - mrp * (discount / 100);
  //   creating order id

  let razorPayOrderObject: RazorPayOrderResponse;

  try {
    razorPayOrderObject = <RazorPayOrderResponse>await instance.orders.create({
      amount: Math.floor(price * 100),
      currency: "INR",
      receipt: `feelfreetocode_order${Date.now()}`,
      payment_capture: true,
      notes: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500);
    return response.send("Razorpay Error");
  }

  console.log(razorPayOrderObject);

  const paymentObject = await new PaymentModel({
    order_id: razorPayOrderObject.id,
  }).save();

  const _order = {
    payment: paymentObject,
    user: user,
    picture: picture,
    price: price,
  };
  const order = await new OrderModel(_order).save();

  response.json({
    payment: paymentObject,
    order,
  });
}

export async function getOrder(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const orderid = request.params.orderid;

  if (!isValidObjectId(orderid)) {
    response.status(400);
    return next(new Error("Invalid Order id"));
  }

  const order = await OrderModel.findById(orderid);

  response.status(404)

  return (order)?
    response.status(200).json({order}) : next(new Error("Not found"))
}

export async function getOrders(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const filter : any  = {}
  const sortby = request.query.sortby || "-created_at"

  const pagesize = request.query.pagesize
    ? Number.parseInt(request.query.pagesize.toString())
    : 2;
  const page: number = request.query.page
    ? Number.parseInt(request.query.page.toString())
    : 1;
  const skip = (page - 1) * pagesize;

  const userid = request.query.user
  if(userid){
    filter.user = userid
  }
  const status = request.query.status
  if(status){
    filter.orderStatus = new RegExp(<string>status , 'i')
  }
  const orders = await OrderModel.find(filter).populate([
    {path : 'user'}, 
    {path : 'payment'}, 
    {path : 'picture'}, 
  ]).skip(skip).limit(pagesize).sort(sortby)

  const totalOrders = await OrderModel.find().countDocuments()

  // underscore // lodash
  response.json({
    orders, 
    count : orders.length , 
    pagesize : pagesize , 
    page : page , 
    totalOrders
  })

}

