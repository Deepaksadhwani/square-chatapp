import { Router } from "express";
import { verifyToken } from "../middlewares/auth-middleware";
import {
  createChannelController,
  getUserChannelsController,
} from "../controllers/channel-controller";

export const channelRouter = Router();

channelRouter.post("/create-channel", verifyToken, createChannelController);
channelRouter.get("/get-channels", verifyToken, getUserChannelsController);
