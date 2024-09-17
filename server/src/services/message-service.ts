import Message from "../models/message";

export const createMessage = async (message: any) => {
  const createdMessage = await Message.create(message);
  return createdMessage;
};

export const getMessageData = async (createdMessage: any) => {
  const messageData = await Message.findById(createdMessage._id)
    .populate("sender", "id email lastName firstName image color")
    .populate("recipient", "id email lastName firstName image color");
    return messageData
};
