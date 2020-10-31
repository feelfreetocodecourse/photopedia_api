import express from "express";
import { createConnection } from "./db/connection";

const app = express();

// creating connection
createConnection()

app.listen(3000, () => {
  console.log("App is listenin......");
});

