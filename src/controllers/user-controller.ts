import { Request, Response } from "express";
import Joi from "joi";
import { Mongoose } from "mongoose";
import { UserModel } from "../models/user";
import passwordHash from "password-hash";
import { UserType } from "../types/user-type";

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
      response.status(400).json({ message: error.message });
    }
  }
}
export async function loginUser(request: Request, response: Response) {
  const { body } = request;

  const userValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  });

  const { value, error } = userValidationSchema.validate(body);

  if (error) {
    response.status(400).json({ message: error.details[0].message });
    return;
  }

  const { email, password } = value;
  const user: UserType = <UserType>await UserModel.findOne({ email: email });
  if (!user) {
    return response.status(404).json({
      message: "email or password incorrect",
    });
  }

  console.log(user);
  const isValid = passwordHash.verify(password, user.password + "");

  if (isValid) {
    return response.json({
      message: "Login Success ",
    });
  }

  response.status(404).json({
    message: "email or password incorrect",
  });
}
