import express from "express";
import {
  getUserInfoController,
  loginController,
  signupController,
  updateProfileController,
} from "../controllers/user-controller";
import { verifyToken } from "../middlewares/auth-middleware";

export const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);
userRouter.get("/user-info", verifyToken, getUserInfoController);
userRouter.post("/update-profile", verifyToken, updateProfileController)
