import mongoose from 'mongoose'

export interface UserType extends mongoose.Document{
    name : String , 
    email : String , 
    isAdmin : Boolean, 
    password : String , 
    createdAt: String,
    updatedAt: String,
}

