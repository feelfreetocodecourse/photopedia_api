import mongoose from "mongoose";
import { PaymentType } from "./payment-type";
import { PictureType } from "./picture-type";
import { UserType } from "./user-type";

export interface OrderType extends mongoose.Document {
  user: UserType;
  payment: PaymentType;
  picture: PictureType;
  price: Number;
  createdAt: String;
  updatedAt: String;
  urlKey: String;
  orderStatus ?: String;
  image ?: String;
}
