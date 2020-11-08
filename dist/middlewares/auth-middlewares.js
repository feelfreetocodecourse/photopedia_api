"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthMiddleware = exports.userAuthMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
function userAuthMiddleware(request, response, next) {
    var authorization = request.headers.authorization;
    var token = authorization ? authorization.split(" ")[1] : null;
    if (!token) {
        response.status(401);
        return next(new Error('Token expired'));
    }
    try {
        var payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        request.payload = payload;
    }
    catch (error) {
        response.status(401);
        return next(new Error('Token expired'));
    }
    next();
}
exports.userAuthMiddleware = userAuthMiddleware;
function adminAuthMiddleware(request, response, next) {
    var authorization = request.headers.authorization;
    var token = authorization ? authorization.split(" ")[1] : null;
    if (!token) {
        response.status(401);
        return next(new Error('Token required'));
    }
    try {
        var payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        request.payload = payload;
        var isAdmin = payload.isAdmin;
        if (isAdmin) {
            return next();
        }
        else {
            return next(new Error('you are not authorized to access this resource'));
        }
    }
    catch (error) {
        response.status(401);
        return next(new Error('Token expired'));
    }
}
exports.adminAuthMiddleware = adminAuthMiddleware;
