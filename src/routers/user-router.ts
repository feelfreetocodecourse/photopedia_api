import express, { Request , NextFunction, Response } from "express";
import { getUsers , createUser , loginUser, updateProfile  , getUserOrders} from "../controllers/user-controller";
import { adminAuthMiddleware, userAuthMiddleware } from "../middlewares/auth-middlewares";
// /api/users

const userRouter = express.Router();
userRouter.get("/" , adminAuthMiddleware  ,  getUsers);
userRouter.get("/orders" , userAuthMiddleware , getUserOrders);
userRouter.post('/' ,  createUser )
userRouter.post('/login' ,  loginUser)
userRouter.put('/' , userAuthMiddleware ,   updateProfile)

export { userRouter };
