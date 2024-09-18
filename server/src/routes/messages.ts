import express from "express";
import { verifyToken } from "../middlewares/auth-middleware";
import { getMessagesController } from "../controllers/messages-controller";

const messageRouter = express.Router();

messageRouter.post("/get-messages", verifyToken, getMessagesController);

export default messageRouter;
