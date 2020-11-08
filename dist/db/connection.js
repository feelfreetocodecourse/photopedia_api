"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var DB_URL = process.env.DB_URL;
function createConnection() {
    mongoose_1.default
        .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(function () {
        console.log("connetion created...");
    });
}
exports.createConnection = createConnection;
