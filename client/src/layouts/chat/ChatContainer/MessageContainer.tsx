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
            <div className="my-2 text-center text-gray-500">
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
      className={`${message.sender === ChatData._id ? "text-left" : "text-right"}`}
    >
      {message.messageType === "text" && (
        <div
          className={`${message.sender !== ChatData._id ? "border-[#8417ff]/50 bg-[#8417ff]/5 text-[#8417ff]/90" : "border-white/20 bg-[#2a2a33]/5 text-white/80"} my-1 inline-block max-w-[50vw] break-words rounded border p-4`}
        >
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-400">
        {moment(message.timestamp).format("LT")}
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
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className="scrollbar-hidden w-full flex-1 overflow-y-auto p-4 px-8 md:w-[65w] lg:w-[70vw] xl:w-[80vw]">
      {renderMessage()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
