import mongoose from "mongoose";
export function createConnection() {
  mongoose
    .connect("mongodb://localhost:27017/photopedia", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connetion created...");
    });
}
