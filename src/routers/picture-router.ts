import express from "express";
import {
  getPictures,
  createPicture,
  deletePicture,
  updatePicture,
  updateThumbnail,
  updateHighQualityImage
} from "../controllers/picture-controller";
import { adminAuthMiddleware } from "../middlewares/auth-middlewares";
import {
  highQualityImageUpdateMiddleware,
  pictureUploadMiddleware,
  thumbnailUpdateMiddleware,
} from "../middlewares/picture-middleware";
// /api/pictures
const pictureRouter = express.Router();
pictureRouter.get("/", getPictures);
pictureRouter.post(
  "/",
  adminAuthMiddleware,
  pictureUploadMiddleware,
  createPicture
);
pictureRouter.delete("/:id", adminAuthMiddleware, deletePicture);
pictureRouter.put("/:id", adminAuthMiddleware, updatePicture);
pictureRouter.put(
  "/:id/thumbnail",
  adminAuthMiddleware,
  thumbnailUpdateMiddleware,
  updateThumbnail
);
pictureRouter.put(
  "/:id/highqualityimage",
  adminAuthMiddleware,
  highQualityImageUpdateMiddleware,
  updateHighQualityImage
);

export { pictureRouter };
