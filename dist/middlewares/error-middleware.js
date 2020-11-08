"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var logger_1 = require("../utils/logger");
function errorHandler(err, req, res, next) {
    console.log("Error Handler", err.message);
    if (res.statusCode == 200) {
        res.status(500);
    }
    logger_1.winston.error(err.message, err);
    res.json({ message: err.message || err });
}
exports.errorHandler = errorHandler;
