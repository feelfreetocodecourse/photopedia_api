import express from "express";
import { highQualityImageDownload, thumbnailDownload } from "../controllers/file-download-controller";


const fileDownloadRouter = express.Router();

fileDownloadRouter.get("/thumbnail/:id" , thumbnailDownload )
fileDownloadRouter.get("/high_quality_image/:id" , highQualityImageDownload )

export { fileDownloadRouter };
