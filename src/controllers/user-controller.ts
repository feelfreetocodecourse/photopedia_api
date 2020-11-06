import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { UserModel } from "../models/user";
import passwordHash from "password-hash";
import { UserType } from "../types/user-type";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/token-payload";
import { OrderModel } from "../models/order";
const { JWT_SECRET } = process.env;

export function getUsers(request: Request, response: Response) {
  response.json({ message: "All Users" });
}
export async function getUserOrders(request: Request, response: Response) {
  const payload = <TokenPayload>(<any>request).payload;
  const _id = payload._id;
  let orders = await OrderModel
  .find({
    user: new UserModel({ _id: _id }),
  }).populate([
    { path : 'picture'} , 
    {path : 'payment'}, 
  ])

  orders = orders.map((order)=>{
    order = order.toJSON()
    console.log(order.image);
    
    if (order.payment.payment_status === "Failed") {
      delete order.image
    }
    return order
  })

  response.json({ orders });
}

export async function updateProfile(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { body } = request;

  const validationSchema = Joi.object({
    name: Joi.string().min(4),
  });

  const { value, error } = validationSchema.validate(body);

  if (error) {
    return next(new Error(error.details[0].message));
  }

  const payload = <TokenPayload>(<any>request).payload;

  const user = await UserModel.findOneAndUpdate(
    { _id: payload._id },
    { $set: { ...value } },
    { new: true }
  );
  response.json({ message: "profile updated", user });
}

export async function createUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { body } = request;

  const userValidationSchema = Joi.object({
    name: Joi.string().required().min(4),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    repeat_password: Joi.ref("password"),
  }).with("password", "repeat_password");

  const { value, error } = userValidationSchema.validate(body);

  if (error) {
    return next(new Error(error.details[0].message));
  }

  try {
    const generatedPassword = passwordHash.generate(value.password);
    console.log({ generatedPassword });
    const userObject = {
      ...value,
      password: generatedPassword,
    };
    const user = await new UserModel(userObject).save();
    response.json({
      user,
    });
  } catch (error) {
    if (error.name === "MongoError") {
      return next(new Error(error.message));
    }
  }
}

export async function loginUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { body } = request;

  const userValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  });

  const { value, error } = userValidationSchema.validate(body);

  if (error) {
    response.status(400);
    return next(new Error(error.details[0].message));
  }

  const { email, password } = value;
  const user: UserType = <UserType>await UserModel.findOne({ email: email });
  if (!user) {
    response.status(400);
    return next(new Error("email or password incorrect"));
  }

  console.log(user);
  const isValid = passwordHash.verify(password, user.password + "");

  if (isValid) {
    const payload = {
      _id: user._id,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, <string>JWT_SECRET);
    return response.json({
      message: "Login Success ",
      token: token,
    });
  }

  response.status(400);
  return next("email or password incorrect");
}
