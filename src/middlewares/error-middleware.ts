import { NextFunction, Request, Response } from "express";

export function errorHandler(err : Error , req : Request , res : Response , next : NextFunction) {
    console.log("Error Handler" , err.message);
    if(res.statusCode == 200 ){
        res.status(500)
    }
    
    res.json({message : err.message})
}