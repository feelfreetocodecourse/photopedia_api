import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/token-payload";

const SECRET_KEY = "photopedia@123";
export function userAuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const { authorization } = request.headers;
  const token = authorization ? authorization.split(" ")[1] : null;

  if (!token) {
        
    response.status(401)
    return next(new Error('Token expired'))
  }

  try {
    const payload = <any>jwt.verify(token, SECRET_KEY);
    (<any>request).payload = payload;
  } catch (error) {
    response.status(401)
   return next(new Error('Token expired'))
  }
  next();
}


export function adminAuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const { authorization } = request.headers;
  const token = authorization ? authorization.split(" ")[1] : null;

  if (!token) {
    response.status(401)
    return next(new Error('Token required'))
  }

  try {
    const payload = <any>jwt.verify(token, SECRET_KEY);
    (<any>request).payload = payload;
    const isAdmin = (payload as TokenPayload).isAdmin

    if(isAdmin){
        return next()
    }else{
        return next(new Error('you are not authorized to access this resource'))
    }
  } catch (error) {
    response.status(401)
   return next(new Error('Token expired'))
  }
}
