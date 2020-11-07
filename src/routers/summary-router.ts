import express, { Request , NextFunction, Response } from "express";
import { summary } from "../controllers/summary-controller";
import { getUsers , createUser , loginUser, updateProfile , isAdmin , getUserOrders, getProfile, getUser, getUserOrder} from "../controllers/user-controller";
import { adminAuthMiddleware, userAuthMiddleware } from "../middlewares/auth-middlewares";
// /api/summary

const summaryRouter = express.Router();
summaryRouter.get('/' , summary)
export { summaryRouter  };
