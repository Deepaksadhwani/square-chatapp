import { Response } from "express";
import {
  getAllContacts,
  getUserContactWithOrder,
} from "../services/contact-service";
import mongoose from "mongoose";

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

    const contacts = await getAllContacts(req, regex);

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
