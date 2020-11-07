import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { UserModel } from "../models/user";
import passwordHash from "password-hash";
import { UserType } from "../types/user-type";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/token-payload";
import { OrderModel } from "../models/order";
import { isValidObjectId } from "mongoose";
import { nextTick } from "process";
const { JWT_SECRET } = process.env;

async function getSaleSummary() {
    const summary = await OrderModel.aggregate()
    .match({
        orderStatus : 'Success'
    })
    .group({
        _id : "$picture" , 
        count :{
            $sum : 1
        }, 
        totalSale : {
            $sum : "$price"
        }
    })
    .lookup({
        from: "pictures",
       localField: "_id",
       foreignField: "_id",
       as: "picture"
    })

    return summary.map(obj=>{
        delete obj._id
        obj.picture = obj.picture[0]
        return obj
    })

}

export async function summary(request: Request, response: Response) {
    const saleSummary = await getSaleSummary()
    response.json({
       saleSummary
    })
}
