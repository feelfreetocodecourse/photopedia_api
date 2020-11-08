import dotenv from "dotenv";
dotenv.config();

import { winston } from "./utils/logger";
process.on("uncaughtException", (er) => {
  winston.error("uncaughtException", er);
});
process.on("unhandledRejection", (er) => {
  winston.error("unhandledRejection", er);
});

import express from "express";
import { createConnection } from "./db/connection";
import { errorHandler } from "./middlewares/error-middleware";
import {
  fileDownloadRouter,
  orderRouter,
  paymentRouter,
  pictureRouter,
  summaryRouter,
  userRouter,
} from "./routers";
import morgan from "morgan";
import helmet from 'helmet'
import cors from 'cors'

const app = express();
app.use(helmet())
app.use(cors())
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());

console.log("PORT", process.env.PORT);
const { PORT, JWT_SECRET, HOST } = process.env;

// creating connection
createConnection();
console.log(JWT_SECRET, HOST);

app.listen(PORT || 3000, () => {
  console.log("App is listening On ", PORT || 3000);
});

const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.get("/", (req, res) => {
  res.json({ message: "API is working.." });
});
apiRouter.use("/users", userRouter);
apiRouter.use("/pictures", pictureRouter);
apiRouter.use("/orders", orderRouter);
apiRouter.use("/payments", paymentRouter);
apiRouter.use("/file", fileDownloadRouter);
apiRouter.use("/summary", summaryRouter);

app.use(errorHandler);
