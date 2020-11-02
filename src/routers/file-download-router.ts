import express from "express";
import { thumbnailDownload } from "../controllers/file-download-controller";


const fileDownloadRouter = express.Router();

fileDownloadRouter.get("/thumbnail/:id" , thumbnailDownload )

export { fileDownloadRouter };
