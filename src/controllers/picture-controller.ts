import { NextFunction, Request, Response } from "express";
import joi from "joi";
export function getPictures(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.json({ message: "All Pictures" });
}

// //  title:
// description
// price:
// discount:
// tags
export async function createPicture(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { body } = request;
  const schema = joi.object({
    title: joi.string().required().min(5),
    description: joi.string(),
    price: joi.number().required().min(1),
    discount: joi.number(),
    tags: joi.array().items(joi.string()),
  });

  const { value, error } = schema.validate(body);

  if (error) {
    return next(new Error(error.details[0].message));
  }
    console.log(value);
    console.log(request.files);
  response.json({ message: "Create picures" });
}
