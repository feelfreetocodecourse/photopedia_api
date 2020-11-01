import { NextFunction, Request, Response } from "express";

export function getPictures(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.json({ message: "All Pictures" });
}
export async function createPicture(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.json({ message: "Create picures" });
}
