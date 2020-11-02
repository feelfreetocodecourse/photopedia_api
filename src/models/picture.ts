import mongoose from "mongoose";
import { PictureType } from "../types/picture-type";
const { Schema } = mongoose;
import fs from "fs";
import joi, { valid } from "joi";

const pictureSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 4 },
    description: { type: String, required: false },
    thumbnail: { type: String, required: true },
    highQualityImage: { type: String, required: true },
    price: { type: Number, required: true, minlength: 1 },
    discount: { type: Number, required: false, default: 0 },
    tags: { type: [String] },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    
    toJSON : {
      transform : ( doc , picture )=>{
        picture.thumbnail = `http://localhost:3000/api/file/thumbnail/${picture._id}`
        return picture
      }
    }
  }
);

const PictureModel = mongoose.model<PictureType>("Picture", pictureSchema);

function deleteFile(path: string) {
  fs.unlink(path, () => {
    console.log("File Deleted");
  });
}

export function validatePictureBody(body: any, files: any) {
  const data: { error: string; value: any } = { error: "", value: undefined };
  const schema = joi.object({
    title: joi.string().required().min(5),
    description: joi.string(),
    price: joi.number().required().min(1),
    discount: joi.number(),
    tags: joi.array().items(joi.string()),
  });

  const { value, error } = schema.validate(body);

  if (!files) {
    data.error = "thumbnail and high Quality Images required";
    return data;
  }

  const thumbnailImageArray = <Express.Multer.File[]>files["thumbnail"];
  const highQualityImageArray = <Express.Multer.File[]>(
    files["highQualityImage"]
  );
  const thumbnail = <Express.Multer.File>(
    (thumbnailImageArray ? thumbnailImageArray[0] : null)
  );
  const highQualityImage = <Express.Multer.File>(
    (highQualityImageArray ? highQualityImageArray[0] : null)
  );

  if (highQualityImage && !thumbnail) {
    deleteFile(highQualityImage.path);
    data.error = "thumbnail required";
    return data;
  }

  if (!highQualityImage && thumbnail) {
    deleteFile(thumbnail.path);
    data.error = "high Quanlity Image required";
    return data;
  }
  if (!highQualityImage && !thumbnail) {
    data.error = "high Quanlity Image required";
    return data;
  }

  if (error) {
    deleteFile(thumbnail.path);
    deleteFile(highQualityImage.path);
    data.error = error.details[0].message;
    return data;
  }

  //    value
  const _picture: PictureType = {
    ...value,
    highQualityImage: highQualityImage.path,
    thumbnail: thumbnail.path,
  };

  data.value = _picture;
  return data;
}

export { PictureModel };
