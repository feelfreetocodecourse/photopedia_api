import express from "express";
import { getUsers , createUser } from "../controllers/user-controller";
// /api/users
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post('/' , createUser )

export { userRouter };
