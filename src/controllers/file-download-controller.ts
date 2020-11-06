import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { OrderModel } from "../models/order";
import { PaymentModel } from "../models/payment";
import { PictureModel } from "../models/picture";
import { UserModel } from "../models/user";
import { OrderType } from "../types/order-type";
import { PictureType } from "../types/picture-type";
import { TokenPayload } from "../types/token-payload";

const short = require('short-uuid');
const translator = short();
export async function thumbnailDownload(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(request.params.id);
  const id = request.params.id;
  const pic = <PictureType>await PictureModel.findOne({ _id: id });
  const path = pic.thumbnail;
  response.download(<string>path);
}

export async function highQualityImageDownload(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(request.params.imageKey);
  
  
  const imageKey = request.params.imageKey;
  const order = <OrderType>await OrderModel.findOne({ urlKey: imageKey }).populate('picture')

  if(order){
    const path = <string>order.picture.highQualityImage

    order.urlKey = translator.new()
    await order.save()
    response.download(path)
    return 
  }


  response.status(404)
  return next(new Error("Link Expired"))

  
}
