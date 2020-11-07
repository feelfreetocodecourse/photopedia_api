import express, { Request , NextFunction, Response } from "express";
import { summary } from "../controllers/summary-controller";
import { adminAuthMiddleware } from "../middlewares/auth-middlewares";
// /api/summary

const summaryRouter = express.Router();
summaryRouter.get('/' , adminAuthMiddleware ,  summary)
export { summaryRouter  };
