"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express_1 = __importDefault(require("express"));
var order_controller_1 = require("../controllers/order-controller");
var auth_middlewares_1 = require("../middlewares/auth-middlewares");
var orderRouter = express_1.default.Router();
exports.orderRouter = orderRouter;
// /api/orders
orderRouter.post('/', auth_middlewares_1.userAuthMiddleware, order_controller_1.createOrder);
orderRouter.get('/', auth_middlewares_1.adminAuthMiddleware, order_controller_1.getOrders);
orderRouter.get('/:orderid', auth_middlewares_1.adminAuthMiddleware, order_controller_1.getOrder);
