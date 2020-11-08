"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summaryRouter = void 0;
var express_1 = __importDefault(require("express"));
var summary_controller_1 = require("../controllers/summary-controller");
var auth_middlewares_1 = require("../middlewares/auth-middlewares");
// /api/summary
var summaryRouter = express_1.default.Router();
exports.summaryRouter = summaryRouter;
summaryRouter.get('/', auth_middlewares_1.adminAuthMiddleware, summary_controller_1.summary);
