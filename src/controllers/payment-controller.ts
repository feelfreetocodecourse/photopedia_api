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

export async function verifyPayment(
  request: Request,
  response: Response,
  next: NextFunction
) {
    response.json({message : "Verify Payment"})
}
