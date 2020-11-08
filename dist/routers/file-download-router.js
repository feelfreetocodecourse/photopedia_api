"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDownloadRouter = void 0;
var express_1 = __importDefault(require("express"));
var file_download_controller_1 = require("../controllers/file-download-controller");
var fileDownloadRouter = express_1.default.Router();
exports.fileDownloadRouter = fileDownloadRouter;
fileDownloadRouter.get("/thumbnail/:id", file_download_controller_1.thumbnailDownload);
fileDownloadRouter.get("/highqualityimage/:imageKey", file_download_controller_1.highQualityImageDownload);
