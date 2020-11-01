import express from "express";
import { getPictures, createPicture } from "../controllers/picture-controller";
import { adminAuthMiddleware } from "../middlewares/auth-middlewares";
import multer from "multer";
multer({ dest: "upload/" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.png`);
  },
});

const upload = multer({ storage: storage });
const multiUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "highQualityImage", maxCount: 1 },
]);
// /api/pictures

const pictureRouter = express.Router();

pictureRouter.get("/", getPictures);
pictureRouter.post(
  "/",
  adminAuthMiddleware,
  multiUpload,
  createPicture
);

export { pictureRouter };
