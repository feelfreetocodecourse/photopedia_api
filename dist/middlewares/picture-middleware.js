"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.highQualityImageUpdateMiddleware = exports.thumbnailUpdateMiddleware = exports.pictureUploadMiddleware = void 0;
var multer_1 = __importDefault(require("multer"));
var highQualityImagePath = "upload/high_quality_images";
var thumbnailPath = "upload/thumbnails";
multer_1.default({ dest: "upload/" });
multer_1.default({ dest: highQualityImagePath });
multer_1.default({ dest: thumbnailPath });
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var fieldname = file.fieldname;
        var path = (fieldname == "thumbnail") ? thumbnailPath : highQualityImagePath;
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".png");
    },
});
var upload = multer_1.default({ storage: storage });
exports.pictureUploadMiddleware = upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "highQualityImage", maxCount: 1 },
]);
exports.thumbnailUpdateMiddleware = upload.single('thumbnail');
exports.highQualityImageUpdateMiddleware = upload.single('highQualityImage');
