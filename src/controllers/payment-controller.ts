import { NextFunction, Request, Response } from "express";
import Razorpay from "razorpay";
import { PaymentType } from "../types/payment-type";
import { PaymentModel } from "../models/payment";
import { OrderModel } from "../models/order";
import { OrderType } from "../types/order-type";
import {createHmac} from 'crypto'
import Joi from 'joi'
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

    const schema = Joi.object({
        payment_id : Joi.string().required(), 
        order_id : Joi.string().required(), 
        razorpay_signature : Joi.string().required(), 

    })

    const {error , value}  = schema.validate(request.body)

    if(error){
        response.status(400)
        return next(new Error(error.details[0].message))
    }

    const razorpay_signature = value.razorpay_signature
    const payment_id = value.payment_id
    const order_id = value.order_id

    const generatedHash = createHmac("SHA256" , <string>KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest('hex')
    let payment = <PaymentType>await PaymentModel.findOne({order_id : order_id})
    let order = <OrderType>await OrderModel.findOne({payment : payment})
    let message = ""
    if(generatedHash == razorpay_signature){
        // paymnet success
        payment.payment_status = "success"
        message = "Payment Success" 
        order = await OrderModel.populate( order , [{path : 'picture'}])
    }else{
        payment.payment_status = "Failed"
        response.status(400)
        message  = "Payment Failed"
        order = await OrderModel.populate( order , [{path : 'picture' , select : '-highQualityImage'}])
    }
    payment = await payment.save()
    response.json({message : message , payment , order })
}
