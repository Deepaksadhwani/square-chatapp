import express from "express";
import { verifyToken } from "../middlewares/auth-middleware";
import { getMessagesController, uploadFilesController } from "../controllers/messages-controller";
import multer from "multer";

const messageRouter = express.Router();
const upload = multer({ dest: "uploads/profiles/" });

messageRouter.post("/get-messages", verifyToken, getMessagesController);
messageRouter.post("/upload-file",verifyToken, upload.single('file'),uploadFilesController)
export default messageRouter;
