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
import Joi from  'joi'
import {createHmac} from 'crypto'
const { KEY_ID, KEY_SECRET } = process.env;
var instance = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

export async function verifyPayment(
  request: Request,
  response: Response,
  next: NextFunction
) {
    const body = request.body
    const schema = Joi.object({
        order_id : Joi.string().required(), 
        payment_id : Joi.string().required(), 
        razorpay_signature : Joi.string().required(), 
    })

    const {error , value} = schema.validate(body)
    if(error){
        response.status(400)
        return next(new Error(error.details[0].message))
    }

    const {order_id , payment_id ,  razorpay_signature} = value

    const generatedHex = createHmac("SHA256" , <string>KEY_SECRET )
    .update(order_id + "|" + payment_id)
    .digest("hex")

    if(generatedHex == razorpay_signature){
        return response.json({message : "Success   Payment"})
    }

    response.json({message : "Failed.. Payment"})

    
}
