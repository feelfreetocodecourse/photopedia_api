import express, { Request , NextFunction, Response } from "express";
import { getUsers , createUser , loginUser, updateProfile } from "../controllers/user-controller";
import { userAuthMiddleware } from "../middlewares/auth-middlewares";
// /api/users

const userRouter = express.Router();
userRouter.get("/" , getUsers);
userRouter.post('/' ,  createUser )
userRouter.post('/login' ,  loginUser)
userRouter.put('/' , userAuthMiddleware ,   updateProfile)

export { userRouter };
