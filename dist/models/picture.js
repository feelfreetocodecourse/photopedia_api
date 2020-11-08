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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureModel = exports.validatePictureBody = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var fs_1 = __importDefault(require("fs"));
var joi_1 = __importDefault(require("joi"));
var HOST = process.env.HOST;
var pictureSchema = new Schema({
    title: { type: String, required: true, minlength: 4 },
    description: { type: String, required: false },
    thumbnail: { type: String, required: true },
    highQualityImage: { type: String, required: true },
    price: { type: Number, required: true, minlength: 1 },
    discount: { type: Number, required: false, default: 0 },
    tags: { type: [String] },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    toJSON: {
        transform: function (doc, picture) {
            picture.thumbnail = HOST + "/api/file/thumbnail/" + picture._id;
            delete picture.highQualityImage;
            return picture;
        }
    }
});
var PictureModel = mongoose_1.default.model("Picture", pictureSchema);
exports.PictureModel = PictureModel;
function deleteFile(path) {
    fs_1.default.unlink(path, function () {
        console.log("File Deleted");
    });
}
function validatePictureBody(body, files) {
    var data = { error: "", value: undefined };
    var schema = joi_1.default.object({
        title: joi_1.default.string().required().min(5),
        description: joi_1.default.string(),
        price: joi_1.default.number().required().min(1),
        discount: joi_1.default.number(),
        tags: joi_1.default.array().items(joi_1.default.string()),
    });
    var _a = schema.validate(body), value = _a.value, error = _a.error;
    if (!files) {
        data.error = "thumbnail and high Quality Images required";
        return data;
    }
    var thumbnailImageArray = files["thumbnail"];
    var highQualityImageArray = (files["highQualityImage"]);
    var thumbnail = ((thumbnailImageArray ? thumbnailImageArray[0] : null));
    var highQualityImage = ((highQualityImageArray ? highQualityImageArray[0] : null));
    if (highQualityImage && !thumbnail) {
        deleteFile(highQualityImage.path);
        data.error = "thumbnail required";
        return data;
    }
    if (!highQualityImage && thumbnail) {
        deleteFile(thumbnail.path);
        data.error = "high Quanlity Image required";
        return data;
    }
    if (!highQualityImage && !thumbnail) {
        data.error = "high Quanlity Image required";
        return data;
    }
    if (error) {
        deleteFile(thumbnail.path);
        deleteFile(highQualityImage.path);
        data.error = error.details[0].message;
        return data;
    }
    //    value
    var _picture = __assign(__assign({}, value), { highQualityImage: highQualityImage.path, thumbnail: thumbnail.path });
    data.value = _picture;
    return data;
}
exports.validatePictureBody = validatePictureBody;
