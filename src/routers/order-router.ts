import express from "express";
import { createOrder , getOrder, getOrders } from "../controllers/order-controller";
import { adminAuthMiddleware, userAuthMiddleware } from "../middlewares/auth-middlewares";

const orderRouter = express.Router();
// /api/orders
orderRouter.post('/' , userAuthMiddleware  , createOrder )
orderRouter.get('/' , adminAuthMiddleware  , getOrders )
orderRouter.get('/:orderid' , adminAuthMiddleware  , getOrder )

export { orderRouter };
