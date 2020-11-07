import dotenv from 'dotenv'
dotenv.config()

process.on('uncaughtException' , (er)=>{
  console.log("uncaughtException");
})
process.on('unhandledRejection' , (er)=>{
  console.log("unhandledRejection");
})

Promise.reject().then(r=>{})
throw new Error()


import express from "express";
import { createConnection } from "./db/connection";
import { errorHandler } from "./middlewares/error-middleware";
import { fileDownloadRouter } from "./routers/file-download-router";
import { orderRouter } from './routers/order-router';
import { paymentRouter } from './routers/payment-router';
import { pictureRouter } from "./routers/picture-router";
import { userRouter } from "./routers/user-router";
import morgan from 'morgan'
import { summaryRouter } from './routers/summary-router';

const app = express();
app.use(morgan("dev"))
app.use(express.urlencoded());
app.use(express.json());

console.log("PORT" , process.env.PORT);
const {PORT , JWT_SECRET , HOST } = process.env 

// creating connection
createConnection();
console.log(JWT_SECRET , HOST);

app.listen( PORT || 3000 , () => {
  console.log("App is listening On " , (PORT || 3000));
});

const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.get("/", (req, res) => {
  res.json({ message: "API is working.." });
});
apiRouter.use("/users", userRouter);
apiRouter.use("/pictures" , pictureRouter)
apiRouter.use("/orders" , orderRouter)
apiRouter.use('/payments' , paymentRouter)
apiRouter.use("/file" , fileDownloadRouter)
apiRouter.use("/summary" , summaryRouter)

app.use(errorHandler)

