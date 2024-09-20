import mongoose from "mongoose";
import Channel from "../models/Channel";

export async function createChannel(name: string, members: any, id: string) {
  const NewChannel = await Channel.create({ name, members, admin: id });
  return NewChannel;
}
export async function getUserChannels(id: string) {
  const userId = new mongoose.Types.ObjectId(id);
  const channels = await Channel.find({
    $or: [{ admin: userId }, { members: userId }],
  }).sort({ updatedAt: -1 });
  return channels;
}
