import express, { Request , NextFunction, Response } from "express";
import { getUsers , createUser , loginUser, updateProfile , isAdmin , getUserOrders, getProfile, getUser, getUserOrder} from "../controllers/user-controller";
import { adminAuthMiddleware, userAuthMiddleware } from "../middlewares/auth-middlewares";
// /api/users

const userRouter = express.Router();
userRouter.get("/" , adminAuthMiddleware  ,  getUsers);
userRouter.put('/' , userAuthMiddleware ,   updateProfile)
userRouter.post('/' ,  createUser )

userRouter.get("/orders" , userAuthMiddleware , getUserOrders);
userRouter.get("/orders/:orderid" , userAuthMiddleware , getUserOrder);
userRouter.get("/isadmin" , userAuthMiddleware , isAdmin);
userRouter.get("/me" , userAuthMiddleware , getProfile);
userRouter.post('/login' ,  loginUser)

userRouter.get("/:id" , adminAuthMiddleware  ,  getUser);

export { userRouter };
