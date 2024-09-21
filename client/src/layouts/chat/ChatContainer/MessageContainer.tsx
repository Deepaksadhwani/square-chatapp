import { AppDispatch, RootState } from "@/store/app-store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setSelectedChatMessages } from "@/store/slices/chat-slice";
import { apiClient } from "@/lib/api-client";
import { FiXCircle } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";

const MessageContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const scrollRef = useRef<any>();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const ChatType = useSelector(
    (state: RootState) => state.chat.selectedChatType,
  );
  const ChatData = useSelector(
    (state: RootState) => state.chat.selectedChatData,
  );
  const chatMessages = useSelector(
    (state: RootState) => state.chat.selectedChatMessages,
  );
  const userData = useSelector((state: RootState) => state.user.userData);

  const renderMessage = () => {
    let lastDate: any = null;
    return chatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="my-4 text-center text-sm font-semibold text-gray-50">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {ChatType === "contact" && renderDmMessages(message)}
          {ChatType === "channel" && renderChannelMessages(message)}
        </div>
      );
    });
  };

  const renderDmMessages = (message: any) => (
    <div
      className={`my-2 flex ${
        message.sender === ChatData._id ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`${
          message.sender !== ChatData._id
            ? "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 font-medium text-white"
            : "bg-gray-700 text-white"
        } max-w-[75%] transform rounded-lg p-2 shadow-md transition duration-300 ease-in-out hover:scale-105`}
      >
        {message.messageType === "text" && (
          <div className="text-sm md:text-base">{message.content}</div>
        )}
        {message.messageType === "file" && (
          <div className="flex cursor-pointer justify-center">
            <img
              src={message.fileUrl}
              alt="uploaded"
              className="h-auto max-h-[200px] w-full max-w-[300px] rounded-lg object-contain"
              onClick={() => setExpandedImage(message.fileUrl)}
            />
          </div>
        )}
        <div className="mt-1 text-right text-xs text-gray-100">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    </div>
  );

  const renderChannelMessages = (message: any) => {
    const isOwnMessage =
      message.sender._id === userData._id || message.sender._id === userData.id;

    return (
      <div className="my-3 flex flex-col gap-1">
        <div
          className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[75%] transform rounded-lg p-3 shadow-lg transition duration-300 ease-in-out hover:scale-105 ${
              isOwnMessage
                ? "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            {/* Message Content */}
            {message.messageType === "text" && (
              <p className="text-sm leading-relaxed md:text-base">
                {message.content}
              </p>
            )}

            {/* File Message with Image */}
            {message.messageType === "file" && (
              <div className="mt-2 flex cursor-pointer justify-center">
                <img
                  src={message.fileUrl}
                  alt="uploaded"
                  className="h-auto max-h-[200px] w-full max-w-[300px] rounded-lg object-contain"
                  onClick={() => setExpandedImage(message.fileUrl)}
                />
              </div>
            )}
          </div>
        </div>
        {/* // user, image, name and time section */}
        <div
          className={`mt-1 flex items-center gap-2 ${
            isOwnMessage ? "justify-end text-right" : "justify-start text-left"
          }`}
        >
          <Avatar className="h-8 w-8 overflow-hidden rounded-full">
            {isOwnMessage ? null : message.sender.image ? (
              <AvatarImage
                src={message.sender.image}
                alt="profile"
                className="h-full w-full bg-black object-cover"
              />
            ) : (
              <AvatarFallback
                className={`flex h-8 w-8 items-center justify-center rounded-full text-lg uppercase ${getColor(
                  message.sender.color,
                )}`}
              >
                {message.sender.firstName
                  ? message.sender.firstName[0]
                  : message.sender.email[0]}
              </AvatarFallback>
            )}
          </Avatar>

          <span className="text-sm text-gray-400">
            {!isOwnMessage &&
              `${message.sender.firstName} ${message.sender.lastName}`}
          </span>

          <time
            className="text-xs text-gray-400"
            dateTime={new Date(message.timestamp).toISOString()}
          >
            {moment(message.timestamp).format("LT")}
          </time>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiClient.post(
          "/messages/get-messages",
          { id: ChatData._id },
          { withCredentials: true },
        );

        if (res.data.messages) {
          dispatch(setSelectedChatMessages(res.data.messages));
        }
      } catch (error) {
        console.log({ error });
      }
    };
    const getChannelMessage = async () => {
      try {
        const res = await apiClient.get(
          `/channels/get-channel-messages/${ChatData._id}`,
          { withCredentials: true },
        );
        if (res.data.messages) {
          dispatch(setSelectedChatMessages(res.data.messages));
        }
      } catch (error) {
        console.log({ error });
      }
    };
    if (ChatData._id) {
      if (ChatType === "contact") getMessages();
      else if (ChatType === "channel") getChannelMessage();
    }
  }, [ChatData, ChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className="scrollbar-hidden w-full flex-1 overflow-y-auto p-4 px-6 md:px-8 lg:px-8">
      {renderMessage()}
      <div ref={scrollRef} />
      {expandedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="relative max-h-[90%] max-w-[90%]">
            <img
              src={expandedImage}
              alt="expanded"
              className="max-h-full max-w-full rounded-lg object-contain"
            />
            <button
              className="absolute right-4 top-4 text-3xl text-white"
              onClick={() => setExpandedImage(null)}
            >
              <FiXCircle />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
