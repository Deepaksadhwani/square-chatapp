 import { Router } from "express";
import { verifyToken } from "../middlewares/auth-middleware";
import { createChannelController } from "../controllers/channel-controller";

export const channelRouter = Router();


channelRouter.post("/create-channel",verifyToken,createChannelController);

