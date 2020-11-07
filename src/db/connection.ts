import mongoose from "mongoose";
const {DB_URL} = process.env
export function createConnection() {
  mongoose
    .connect(<string>DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connetion created...");
    });
}
