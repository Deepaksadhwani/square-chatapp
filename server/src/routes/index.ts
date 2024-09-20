import express from "express";
import { userRouter } from "./user";
import contactRouter from "./contact";
import messageRouter from "./messages";
import { channelRouter } from "./channel";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/contacts", contactRouter);
rootRouter.use("/messages", messageRouter);
rootRouter.use("/channels",channelRouter )
