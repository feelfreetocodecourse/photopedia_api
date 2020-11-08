"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
var express_1 = __importDefault(require("express"));
var payment_controller_1 = require("../controllers/payment-controller");
var auth_middlewares_1 = require("../middlewares/auth-middlewares");
var paymentRouter = express_1.default.Router();
exports.paymentRouter = paymentRouter;
// localhost:3000/api/payments/verify
paymentRouter.post('/verify', auth_middlewares_1.userAuthMiddleware, payment_controller_1.verifyPayment);
