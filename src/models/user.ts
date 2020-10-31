import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, minlength: 5 },
    password: { type: String, required: true, minlength: 10 },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const UserModel = mongoose.model("User", userSchema);

export {UserModel}
