import mongoose, { mongo } from "mongoose";
import { OrderType } from "../types/order-type";
import { UserType } from "../types/user-type";
const { Schema } = mongoose;
const short = require('short-uuid');
const translator = short();
const { HOST } = process.env 
const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref : 'User' },
    payment: { type: Schema.Types.ObjectId, required: true, ref:'Payment' },
    picture : {type: Schema.Types.ObjectId, required: true, ref : 'Picture' },
    price: { type: Number,  required: true},
    orderStatus: { type: String, enum : ['Success' , "Failed"] ,   required: true , default : "Failed"},
    urlKey: { type: String,  required: true , unique : true  ,  default : translator.new },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
     toJSON : {
       transform : (doc , order)=>{
         let key = order.urlKey
         delete order.urlKey
         if(order.orderStatus == "Success"){
          order.image = `${HOST}/api/file/highqualityimage/${key}`
         }
         
          return order
       }
     }
  }
);

const OrderModel = mongoose.model<OrderType>("Order", orderSchema);

export {OrderModel}

