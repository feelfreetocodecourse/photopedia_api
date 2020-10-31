import express, { Request, Response } from "express";
import { createConnection } from "./db/connection";
import { userRouter } from "./routers/user-router";

const app = express();
app.use(express.urlencoded());
app.use(express.json());

// creating connection
createConnection();

app.listen(3000, () => {
  console.log("App is listenin......");
});

const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.get("/", (req, res) => {
  res.json({ message: "API is working.." });
});
apiRouter.use("/users", userRouter);

