import mongoose, { mongo } from "mongoose";
import { OrdeType } from "../types/order-type";
import { UserType } from "../types/user-type";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref : 'User' },
    payment: { type: Schema.Types.ObjectId, required: true, ref:'Payment' },
    picture : {type: Schema.Types.ObjectId, required: true, ref : 'Picture' },
    price: { type: Number,  required: true},
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const OrderModel = mongoose.model<OrdeType>("Order", orderSchema);

export {OrderModel}
