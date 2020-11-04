import { NextFunction, Request, Response } from "express";
import { PictureModel } from "../models/picture";
import { PictureType } from "../types/picture-type";

export  async function thumbnailDownload(request : Request , response : Response , next : NextFunction) {
    console.log(request.params.id);
    const id = request.params.id
    const pic = <PictureType>await PictureModel.findOne({ _id : id })
    const path = pic.thumbnail
    response.download(<string>path)
}

export  async function highQualityImageDownload(request : Request , response : Response , next : NextFunction) {
    console.log(request.params.id);
    const id = request.params.id
    const pic = <PictureType>await PictureModel.findOne({ _id : id })
    const path = pic.highQualityImage
    response.download(<string>path)
}