import express from "express";
import { createOrder } from "../controllers/order-controller";
import { verifyPayment } from "../controllers/payment-controller";
import { userAuthMiddleware } from "../middlewares/auth-middlewares";

const paymentRouter = express.Router();
// localhost:3000/api/payments/verify
paymentRouter.post('/verify' , userAuthMiddleware  , verifyPayment )

export { paymentRouter };
