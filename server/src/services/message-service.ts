import Message from "../models/message";

export const createMessage = async (message: any) => {
  const createdMessage = await Message.create(message);
  return createdMessage;
};

export const getMessageData = async (createdMessage: any) => {
  const messageData = await Message.findById(createdMessage._id)
    .populate("sender", "id email lastName firstName image color")
    .populate("recipient", "id email lastName firstName image color");
  return messageData;
};

export const getChatMessages = async (user1: string, user2: string) => {
  const messages = await Message.find({
    $or: [
      { sender: user1, recipient: user2 },
      { sender: user2, recipient: user1 },
    ],
  }).sort({ timeStamp: 1 });
  return messages;
};
