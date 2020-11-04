import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { OrderModel } from "../models/order";
import { PaymentModel } from "../models/payment";
import { PictureModel } from "../models/picture";
import { UserModel } from "../models/user";
import { PictureType } from "../types/picture-type";
import { TokenPayload } from "../types/token-payload";

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
  console.log(request.params.id);
  const payload = <TokenPayload>(<any>request).payload;
  const user_id = payload._id;
  const id = request.params.id;
  const pic = <PictureType>await PictureModel.findOne({ _id: id });

  let orders = await OrderModel.find({ 
      user: new UserModel({ _id: user_id }), 
      picture : pic
    }).populate({
        path : 'payment', 
        match : {
            payment_status : "Success"
        }
    })

    orders = orders.filter(order=>order.payment!=null)
    if(orders.length > 0){
        const path = pic.highQualityImage;
        return response.download(<string>path);
    }

    response.status(401)
    return next(new Error("You Cant Access this resource"))



  
}
