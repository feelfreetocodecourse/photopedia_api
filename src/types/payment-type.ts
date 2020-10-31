import mongoose from 'mongoose'

export interface PaymentType extends mongoose.Document{
    payment_id : String , 
    order_id : String , 
    payment_status : String ,
    createdAt: String,
    updatedAt: String, 
}
