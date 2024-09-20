import { Server as SocketIOServer } from "socket.io";
import {
  createMessage,
  getChannelMessageData,
  getMessageData,
} from "./services/message-service";
import Channel from "./models/Channel";
const setupSocket = (server: any) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket: any) => {
    console.log(`Client Disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message: any) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);
    const createdMessage = await createMessage(message);
    const messageData = await getMessageData(createdMessage);

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  const sendChannelMessage = async (message: any) => {
    const { channelId, sender, content, messageType, fileUrl } = message;
    const createdMessage = await createMessage({
      sender,
      recipient: null,
      content,
      messageType,
      fileUrl,
      timestamp: new Date(),
    });

    const messageData: any = await getChannelMessageData(createdMessage);

    await Channel.findByIdAndUpdate(channelId, {
      $push: { message: createdMessage._id },
    });

    const channel: any = await Channel.findById(channelId).populate("members");

    const finalData = { ...messageData._doc, channelId: channel._id };
    if (channel && channel.members) {
      channel.members.forEach((member: any) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("receive-channel-message", finalData);
        }
      });
      const adminSocketId = userSocketMap.get(channel.admin._id.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("receive-channel-message", finalData);
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("userId", userId);
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User is connect ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
