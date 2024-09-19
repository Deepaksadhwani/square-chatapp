import { Response } from "express";
import { getChatMessages } from "../services/message-service";
import cloudinary from "../services/cloudinary";
import { unlinkSync } from "fs";

export const getMessagesController = async (req: any, res: Response) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.id;

    if (!user1 || !user2) {
      return res.status(400).json({ message: "Both ID's  are required." });
    }
    const messages = await getChatMessages(user1, user2);
    console.log(messages);
    res.status(200).json({ messages });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const uploadFilesController = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is Required" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "square",
      width: 800,
      height: 800,
      crop: "limit", // Ensure image is within the specified size limits
      quality: "auto:good", // Automatically adjust quality for good balance
      format: "jpg", // Convert image to JPG format
    });
    console.log(result);

    unlinkSync(req.file.path);
    res.status(200).json({
      path: result.secure_url,
    });
  } catch (error) {
    console.log("line 38", { error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
