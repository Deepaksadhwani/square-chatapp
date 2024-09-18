import { Response } from "express";
import { getChatMessages } from "../services/message-service";

export const getMessagesController = async (req: any, res: Response) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.id;
   
    if (!user1 || !user2) {
      return res.status(400).json({ message: "Both ID's  are required." });
    }
    const messages = await getChatMessages(user1, user2);
    console.log(messages)
    res.status(200).json({ messages });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
