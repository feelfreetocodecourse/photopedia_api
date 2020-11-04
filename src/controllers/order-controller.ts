import { NextFunction, Request, Response } from "express";
import { PictureModel } from "../models/picture";
import { TokenPayload } from "../types/token-payload";
import Razorpay from "razorpay";
import { PictureType } from "../types/picture-type";
import { UserModel } from "../models/user";
import { UserType } from "../types/user-type";
import { RazorPayOrderResponse } from "../types/razorpay-order-response";
import { PaymentType } from "../types/payment-type";
import { PaymentModel } from "../models/payment";
import { OrderModel } from "../models/order";
import { OrderType } from "../types/order-type";
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

  console.log({ user });

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
    return response.send(error.message)
    
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
