import mongoose from 'mongoose'

export interface PictureType extends mongoose.Document{
    title : String , 
    description : String , 
    thumbnail : String , 
    highQualityImage : String,
    price: Number,
    discount : Number ,
    tags : [String]
}

