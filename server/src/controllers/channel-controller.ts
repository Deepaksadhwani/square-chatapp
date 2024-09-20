import { Response } from "express";
import { findUserChannel, getMembers } from "../services/user-service";
import { createChannel } from "../services/channel-service";
import { channel } from "diagnostics_channel";

export const createChannelController = async (req: any, res: Response) => {
  try {
    const { name, members } = req.body;
    const { userId } = req;
    const admin = await findUserChannel(userId);
    if (!admin) {
      return res.status(400).json({ message: "Admin user not found." });
    }
    const validateMembers = await getMembers(members);

    if (validateMembers.length !== members.length) {
      return res
        .status(400)
        .json({ message: "some members are not valid users." });
    }
    const NewChannel = await createChannel(name,members,userId);

    return res.status(201).json({ channel: NewChannel});
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
