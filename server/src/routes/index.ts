import express from "express";
import { userRouter } from "./user";
import contactRouter from "./contact";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/contacts",contactRouter)
