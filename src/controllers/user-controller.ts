import { Request, Response } from "express";
import Joi from "joi";
import { UserModel } from "../models/user";

export function getUsers(request: Request, response: Response) {
  response.json({ message: "All Users" });
}

export async function createUser(request: Request, response: Response) {
  const { body } = request;

  const userValidationSchema = Joi.object({
    name: Joi.string().required().min(4),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    repeat_password: Joi.ref("password"),
  }).with("password", "repeat_password");

  const { value, error } = userValidationSchema.validate(body);

  if (error) {
    response.status(400).json({ message: error.details[0].message });
    return;
  }

  if (value) {
    const user = await new UserModel(value).save();
    response.json({
      user,
    });
  }
}
