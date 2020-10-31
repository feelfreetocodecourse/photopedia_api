import mongoose from "mongoose";
import { PictureType } from "../types/picture-type";
const { Schema } = mongoose;

const pictureSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 4 },
    description : { type: String, required: false },
    thumbnail : { type: String , required: true },
    highQualityImage : { type: String, required: true },
    price: { type: Number , required: true, minlength: 1 },
    discount: { type: Number , required: false, default : 0 },
    tags : { type : [String] }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const PictureModel = mongoose.model<PictureType>("Picture", pictureSchema);

export {PictureModel}
