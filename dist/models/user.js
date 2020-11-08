"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, minlength: 5, unique: true },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, required: true, minlength: 10 },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    toJSON: {
        transform: function (doc, user) {
            delete user.password;
            return user;
        }
    }
});
var UserModel = mongoose_1.default.model("User", userSchema);
exports.UserModel = UserModel;
