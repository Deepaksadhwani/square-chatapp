import { AppDispatch, RootState } from "@/store/app-store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setSelectedChatMessages } from "@/store/slices/chat-slice";
import { apiClient } from "@/lib/api-client";

const MessageContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const scrollRef = useRef<any>();
  const ChatType = useSelector(
    (state: RootState) => state.chat.selectedChatType,
  );
  const ChatData = useSelector(
    (state: RootState) => state.chat.selectedChatData,
  );
  const chatMessages = useSelector(
    (state: RootState) => state.chat.selectedChatMessages,
  );

 
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
        </div>
      );
    });
  };

  const renderDmMessages = (message: any) => (
    <div
      className={`flex my-2 ${
        message.sender === ChatData._id ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`${
          message.sender !== ChatData._id
            ? "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 font-medium text-white"
            : "bg-gray-700 text-white"
        } max-w-[75%] rounded-lg p-3 shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
      >
        {message.messageType === "text" && (
          <div className="text-sm md:text-base">{message.content}</div>
        )}
        <div className="mt-1 text-right text-xs text-gray-100">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    </div>
  );

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
    if (ChatData._id) {
      if (ChatType === "contact") getMessages();
    }
  }, [ChatData, ChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className="scrollbar-hidden flex-1 w-full overflow-y-auto p-4 px-6 md:px-8 lg:px-12">
      {renderMessage()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
