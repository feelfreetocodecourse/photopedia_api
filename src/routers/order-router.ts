import express from "express";
import { createOrder } from "../controllers/order-controller";
import { userAuthMiddleware } from "../middlewares/auth-middlewares";

const orderRouter = express.Router();

orderRouter.post('/' , userAuthMiddleware  , createOrder )

export { orderRouter };
