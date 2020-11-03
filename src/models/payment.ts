import mongoose, { mongo } from "mongoose";
import { PaymentType } from "../types/payment-type";
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    payment_id: { type: String, required: false , unique : false  },
    order_id: { type: String, required: true , unique : true  },
    payment_status : { type : String , default : "Failed"}
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const PaymentModel = mongoose.model<PaymentType>("Payment", paymentSchema);

export {PaymentModel}
