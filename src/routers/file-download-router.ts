import express from "express";
import { highQualityImageDownload, thumbnailDownload } from "../controllers/file-download-controller";
import { userAuthMiddleware } from "../middlewares/auth-middlewares";


const fileDownloadRouter = express.Router();

fileDownloadRouter.get("/thumbnail/:id" , thumbnailDownload )
fileDownloadRouter.get("/high_quality_image/:id" , userAuthMiddleware ,  highQualityImageDownload )

export { fileDownloadRouter };
