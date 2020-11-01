import { NextFunction, Request, Response } from "express";
import joi, { valid } from "joi";
import { PictureType } from "../types/picture-type";
import { PictureModel, validatePictureBody } from "../models/picture";
export async function getPictures(
  request: Request,
  response: Response,
  next: NextFunction
) {
    const pictures = await PictureModel.find().select('-highQualityImage')
  response.json({ pictures });
}


export async function createPicture(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { body } = request;
  const {error , value }  = validatePictureBody(body, request.files);

  if(error){
      return next(new Error(error))
  }
  const picture = await new PictureModel(value).save();
  response.json({ message: "Picture Created", picture });
}
