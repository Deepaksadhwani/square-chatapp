import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/user-controller";

export const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);
