import { NextFunction, Request, Response } from "express";
import { winston } from "../utils/logger";

export function errorHandler(err : Error , req : Request , res : Response , next : NextFunction) {
    console.log("Error Handler" , err.message);
    if(res.statusCode == 200 ){
        res.status(500)
    }
    winston.error(err.message , err)
    res.json({message : err.message || err })
}