import express, { Request , NextFunction, Response } from "express";
import { getUsers , createUser , loginUser, updateProfile , isAdmin , getUserOrders, getProfile, getUser, getUserOrder} from "../controllers/user-controller";
import { adminAuthMiddleware, userAuthMiddleware } from "../middlewares/auth-middlewares";
// /api/users

const userRouter = express.Router();
userRouter.get("/" , adminAuthMiddleware  ,  getUsers);

userRouter.get("/orders" , userAuthMiddleware , getUserOrders);
userRouter.get("/:id" , adminAuthMiddleware  ,  getUser);

userRouter.get("/orders/:orderid" , userAuthMiddleware , getUserOrder);
userRouter.get("/isadmin" , userAuthMiddleware , isAdmin);
userRouter.get("/me" , userAuthMiddleware , getProfile);
userRouter.post('/' ,  createUser )
userRouter.post('/login' ,  loginUser)
userRouter.put('/' , userAuthMiddleware ,   updateProfile)

export { userRouter };
