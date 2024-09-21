import { Router } from "express";
import { verifyToken } from "../middlewares/auth-middleware";
import {
  createChannelController,
  getChannelMessageController,
  getUserChannelsController,
} from "../controllers/channel-controller";

export const  channelRouter = Router();

channelRouter.post("/create-channel", verifyToken, createChannelController);
channelRouter.get("/get-channels", verifyToken, getUserChannelsController);
channelRouter.get("/get-channel-messages/:channelId", getChannelMessageController)
