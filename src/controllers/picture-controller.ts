import { NextFunction, Request, Response} from "express";
import joi, { valid } from "joi";
import { PictureType } from "../types/picture-type";
import fs from 'fs'
import { PictureModel, validatePictureBody } from "../models/picture";
import { isValidObjectId } from "mongoose";
export async function getPictures(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const pictures = await PictureModel.find()
  response.json({ pictures });
}
export async function getPicture(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.params
  if(!isValidObjectId(id)){
    response.status(400)
    return next(new Error("picture Id is not valid"))
  }
  const picture = await PictureModel.findOne({_id : id })
  if(!picture){
    response.status(404)
    return next(new Error("Not Found"))
  }
  response.json({ picture });
}

export async function deletePicture(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.params;
  const picture = await PictureModel.findByIdAndDelete(id);
  response.json({
    message: "Picture Deleted",
    picture,
  });
}

export async function createPicture(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { body } = request;
  const { error, value } = validatePictureBody(body, request.files);

  if (error) {
    return next(new Error(error));
  }
  const picture = await new PictureModel(value).save();
  response.json({ message: "Picture Created", picture });
}


export async function updatePicture(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const schema = joi.object({
    title: joi.string().min(5),
    description: joi.string(),
    price: joi.number().min(1),
    discount: joi.number(),
    tags: joi.array().items(joi.string()),
  });
  const { body } = request;
  const {id} = request.params
  const { error, value } = schema.validate(body)

  if (error) {
    return next(new Error(error.details[0].message));
  }
  
  const picture = await PictureModel.findByIdAndUpdate(id , {
    $set : {
      ...value
    }
  } , {new : true})
  response.json({ message: "Picture Updated", picture });
}




export async function updateThumbnail(
  request: Request,
  response: Response,
  next: NextFunction
) {

  if(!request.file){
    return next(new Error ("Thumbnail Required."))
  }
  const path = request.file.path
  const {id} = request.params

  const obj = await PictureModel.findById(id)
  const oldPath = <string>obj?.thumbnail

  fs.unlink(oldPath , ()=>{
    console.log("Old Image Deleted");
  })

  const picture  = await PictureModel.findByIdAndUpdate(id , {
    $set : {
      thumbnail : path
    }
  } , {new : true})
  response.json({ message: "Thumbnail updated" , picture  });
}



export async function updateHighQualityImage(
  request: Request,
  response: Response,
  next: NextFunction
) {

  if(!request.file){
    return next(new Error ("High Quality Image Required."))
  }
  const path = request.file.path
  const {id} = request.params

  const obj = await PictureModel.findById(id)
  const oldPath = <string>obj?.highQualityImage

  fs.unlink(oldPath , ()=>{
    console.log("Old Image Deleted");
  })

  const picture  = await PictureModel.findByIdAndUpdate(id , {
    $set : {
      highQualityImage : path
    }
  } , {new : true})
  response.json({ message: "High Quality Image updated" , picture  });
}