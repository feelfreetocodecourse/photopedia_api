import mongoose, { mongo } from "mongoose";
import { UserType } from "../types/user-type";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, minlength: 5 , unique : true },
    isAdmin: { type: Boolean , default : false },
    password: { type: String, required: true, minlength: 10 },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON : {
      transform : (doc , user)=>{
        delete user.password
        return user
      }
    }
  }
);

const UserModel = mongoose.model<UserType>("User", userSchema);

export {UserModel}
