import express from "express";
import { getPictures, createPicture } from "../controllers/picture-controller";
import { adminAuthMiddleware } from "../middlewares/auth-middlewares";
import { pictureUploadMiddleware } from "../middlewares/picture-middleware";
// /api/pictures

const pictureRouter = express.Router();
pictureRouter.get("/", getPictures);
pictureRouter.post(
  "/",
  adminAuthMiddleware,
  pictureUploadMiddleware,
  createPicture
);

export { pictureRouter };
