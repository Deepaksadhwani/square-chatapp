import express from "express";
import {
  addImageController,
  getUserInfoController,
  loginController,
  removeImageController,
  signupController,
  updateProfileController,
} from "../controllers/user-controller";
import { verifyToken } from "../middlewares/auth-middleware";
import multer from "multer";

export const userRouter = express.Router();
const upload = multer({ dest: "uploads/profiles/" });
userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);
userRouter.get("/user-info", verifyToken, getUserInfoController);
userRouter.post("/update-profile", verifyToken, updateProfileController);
userRouter.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addImageController
);
userRouter.delete(
  "/remove-profile-image",
  verifyToken,
  removeImageController
);
