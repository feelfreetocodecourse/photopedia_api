import express from "express";
import { getUsers , createUser , loginUser } from "../controllers/user-controller";
// /api/users
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post('/' , createUser )
userRouter.post('/login' , loginUser)

export { userRouter };
