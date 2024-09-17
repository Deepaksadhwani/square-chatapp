import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/app-store";
import { useSocket } from "@/contexts/socket";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const socket: any = useSocket();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const selectedChatType = useSelector(
    (state: RootState) => state.chat.selectedChatType,
  );
  const selectedChatData = useSelector(
    (state: RootState) => state.chat.selectedChatData,
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const emojiRef = useRef<any>();

  const handleAddEmoji = (emoji: any) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userData.id || userData._id,
        content: message,
        recipient: selectedChatData._id ,
        messageType: "text",
        fileUrl: null,
        message,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (emojiRef && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
        console.log("moved");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [emojiRef]);

  return (
    <div className="mb-6 flex h-[10vh] items-center justify-center gap-6 bg-[#1c1d25] px-8">
      <div className="flex flex-1 items-center gap-5 rounded-md bg-[#2a2b33] pr-5">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-md bg-transparent p-5 focus:border-none focus:outline-none"
          placeholder="Enter message"
        />
        <button className="text-neutral-500 transition-all duration-300 focus:border-none focus:text-white focus:outline-none">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            onClick={() => setEmojiPickerOpen(true)}
            className="text-neutral-500 transition-all duration-300 focus:border-none focus:text-white focus:outline-none"
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div ref={emojiRef} className="absolute bottom-16 right-0">
            <EmojiPicker
              theme={Theme.DARK}
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSendMessage}
        className="item-center flex justify-center rounded-md bg-[#8417ff] p-5 transition-all duration-300 hover:bg-[#741bda] focus:border-none focus:bg-[#741bda] focus:text-white focus:outline-none"
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
