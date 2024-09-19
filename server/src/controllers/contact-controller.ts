import { Response } from "express";
import {
  getFilterContacts,
  getUserContactWithOrder,
} from "../services/contact-service";
import mongoose from "mongoose";
import { getAllContacts } from "../services/user-service";

export const searchContactsController = async (req: any, res: Response) => {
  try {
    const { searchTerm } = req.body;
    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).json({ message: "SearchTerm is required." });
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()\[\]\\]/g,
      "\\$&"
    );
    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await getFilterContacts(req, regex);

    res.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getContactForDmListController = async (
  req: any,
  res: Response
) => {
  try {
    let { userId } = req;
    userId = new mongoose.Types.ObjectId(userId);
    const contacts = await getUserContactWithOrder(userId);

    res.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getAllContactsController = async (req: any, res: Response) => {
  try {
    const users = await getAllContacts(req.userId);

    const contacts = users.map((user) => ({
      label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
      value: user._id,
    }));
    res.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
