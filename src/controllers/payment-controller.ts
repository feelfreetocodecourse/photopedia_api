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
import { pathToFileURL } from "url";
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

    let payment = <PaymentType>await  PaymentModel.findOne({order_id : order_id})
    

    const generatedHex = createHmac("SHA256" , <string>KEY_SECRET )
    .update(order_id + "|" + payment_id)
    .digest("hex")


    let message = "Payment Sucesss"

    const populateArray = [
        {path : 'payment'}, 
        {path : 'user' , select : "-password"}
    ]

    if(generatedHex == razorpay_signature){
        payment.payment_status = "Success"
        populateArray.push({ path : "picture" })
    }else{
        payment.payment_status = "Failed"
        message = "Payment Failed."
        populateArray.push({ path : "picture" , select : '-highQualityImage' })
        response.status(400)
    }

    payment = await payment.save()
    let order = <OrderType>await OrderModel
                        .findOne({'payment' : payment})
                        

    order.orderStatus = payment.payment_status
    order = await order.save()
    order = await OrderModel.populate(order , populateArray)

    response.json({
        message : message , 
        order
    })

    
    
}
