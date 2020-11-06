import express from "express";
import { highQualityImageDownload, thumbnailDownload } from "../controllers/file-download-controller";
import { userAuthMiddleware } from "../middlewares/auth-middlewares";


const fileDownloadRouter = express.Router();

fileDownloadRouter.get("/thumbnail/:id" , thumbnailDownload )
fileDownloadRouter.get("/highqualityimage/:imageKey" , highQualityImageDownload )

export { fileDownloadRouter };
