"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pictureRouter = void 0;
var express_1 = __importDefault(require("express"));
var picture_controller_1 = require("../controllers/picture-controller");
var auth_middlewares_1 = require("../middlewares/auth-middlewares");
var picture_middleware_1 = require("../middlewares/picture-middleware");
// /api/pictures
var pictureRouter = express_1.default.Router();
exports.pictureRouter = pictureRouter;
pictureRouter.get("/", picture_controller_1.getPictures);
pictureRouter.get("/:id", picture_controller_1.getPicture);
pictureRouter.post("/", auth_middlewares_1.adminAuthMiddleware, picture_middleware_1.pictureUploadMiddleware, picture_controller_1.createPicture);
pictureRouter.delete("/:id", auth_middlewares_1.adminAuthMiddleware, picture_controller_1.deletePicture);
pictureRouter.put("/:id", auth_middlewares_1.adminAuthMiddleware, picture_controller_1.updatePicture);
pictureRouter.put("/:id/thumbnail", auth_middlewares_1.adminAuthMiddleware, picture_middleware_1.thumbnailUpdateMiddleware, picture_controller_1.updateThumbnail);
pictureRouter.put("/:id/highqualityimage", auth_middlewares_1.adminAuthMiddleware, picture_middleware_1.highQualityImageUpdateMiddleware, picture_controller_1.updateHighQualityImage);
