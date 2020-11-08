"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHighQualityImage = exports.updateThumbnail = exports.updatePicture = exports.createPicture = exports.deletePicture = exports.getPicture = exports.getPictures = void 0;
var joi_1 = __importDefault(require("joi"));
var models_1 = require("../models");
var fs_1 = __importDefault(require("fs"));
var picture_1 = require("../models/picture");
var mongoose_1 = require("mongoose");
function getPictures(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var sortby, query, queryObjet, pagesize, page, skip, pictures, totalPictures;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sortby = request.query.sortby || "-created_at";
                    query = request.query.query;
                    queryObjet = {};
                    if (query) {
                        queryObjet = {
                            $or: [
                                {
                                    title: new RegExp(query, "i")
                                },
                                {
                                    tags: {
                                        $in: query
                                    }
                                }
                            ]
                        };
                    }
                    pagesize = request.query.pagesize
                        ? Number.parseInt(request.query.pagesize.toString())
                        : 2;
                    page = request.query.page
                        ? Number.parseInt(request.query.page.toString())
                        : 1;
                    skip = (page - 1) * pagesize;
                    return [4 /*yield*/, models_1.PictureModel.find(__assign({}, queryObjet))
                            .skip(skip)
                            .limit(pagesize)
                            .sort(sortby)];
                case 1:
                    pictures = _a.sent();
                    return [4 /*yield*/, models_1.PictureModel.find().countDocuments()];
                case 2:
                    totalPictures = _a.sent();
                    // underscore // lodash
                    response.json({
                        pictures: pictures,
                        count: pictures.length,
                        pagesize: pagesize,
                        page: page,
                        totalPictures: totalPictures,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getPictures = getPictures;
function getPicture(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, picture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    if (!mongoose_1.isValidObjectId(id)) {
                        response.status(400);
                        return [2 /*return*/, next(new Error("picture Id is not valid"))];
                    }
                    return [4 /*yield*/, models_1.PictureModel.findOne({ _id: id })];
                case 1:
                    picture = _a.sent();
                    if (!picture) {
                        response.status(404);
                        return [2 /*return*/, next(new Error("Not Found"))];
                    }
                    response.json({ picture: picture });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getPicture = getPicture;
function deletePicture(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, picture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    return [4 /*yield*/, models_1.PictureModel.findByIdAndDelete(id)];
                case 1:
                    picture = _a.sent();
                    response.json({
                        message: "Picture Deleted",
                        picture: picture,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.deletePicture = deletePicture;
function createPicture(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, _a, error, value, picture;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = request.body;
                    _a = picture_1.validatePictureBody(body, request.files), error = _a.error, value = _a.value;
                    if (error) {
                        return [2 /*return*/, next(new Error(error))];
                    }
                    return [4 /*yield*/, new models_1.PictureModel(value).save()];
                case 1:
                    picture = _b.sent();
                    response.json({ message: "Picture Created", picture: picture });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createPicture = createPicture;
function updatePicture(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var schema, body, id, _a, error, value, picture;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = joi_1.default.object({
                        title: joi_1.default.string().min(5),
                        description: joi_1.default.string(),
                        price: joi_1.default.number().min(1),
                        discount: joi_1.default.number(),
                        tags: joi_1.default.array().items(joi_1.default.string()),
                    });
                    body = request.body;
                    id = request.params.id;
                    _a = schema.validate(body), error = _a.error, value = _a.value;
                    if (error) {
                        return [2 /*return*/, next(new Error(error.details[0].message))];
                    }
                    return [4 /*yield*/, models_1.PictureModel.findByIdAndUpdate(id, {
                            $set: __assign({}, value),
                        }, { new: true })];
                case 1:
                    picture = _b.sent();
                    response.json({ message: "Picture Updated", picture: picture });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updatePicture = updatePicture;
function updateThumbnail(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var path, id, obj, oldPath, picture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!request.file) {
                        return [2 /*return*/, next(new Error("Thumbnail Required."))];
                    }
                    path = request.file.path;
                    id = request.params.id;
                    return [4 /*yield*/, models_1.PictureModel.findById(id)];
                case 1:
                    obj = _a.sent();
                    oldPath = obj === null || obj === void 0 ? void 0 : obj.thumbnail;
                    fs_1.default.unlink(oldPath, function () {
                        console.log("Old Image Deleted");
                    });
                    return [4 /*yield*/, models_1.PictureModel.findByIdAndUpdate(id, {
                            $set: {
                                thumbnail: path,
                            },
                        }, { new: true })];
                case 2:
                    picture = _a.sent();
                    response.json({ message: "Thumbnail updated", picture: picture });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateThumbnail = updateThumbnail;
function updateHighQualityImage(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var path, id, obj, oldPath, picture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!request.file) {
                        return [2 /*return*/, next(new Error("High Quality Image Required."))];
                    }
                    path = request.file.path;
                    id = request.params.id;
                    return [4 /*yield*/, models_1.PictureModel.findById(id)];
                case 1:
                    obj = _a.sent();
                    oldPath = obj === null || obj === void 0 ? void 0 : obj.highQualityImage;
                    fs_1.default.unlink(oldPath, function () {
                        console.log("Old Image Deleted");
                    });
                    return [4 /*yield*/, models_1.PictureModel.findByIdAndUpdate(id, {
                            $set: {
                                highQualityImage: path,
                            },
                        }, { new: true })];
                case 2:
                    picture = _a.sent();
                    response.json({ message: "High Quality Image updated", picture: picture });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateHighQualityImage = updateHighQualityImage;
