import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/app-store";
import { useSocket } from "@/contexts/socket";
import { apiClient } from "@/lib/api-client";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const socket: any = useSocket();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const selectedChatType = useSelector(
    (state: RootState) => state.chat.selectedChatType
  );
  const selectedChatData = useSelector(
    (state: RootState) => state.chat.selectedChatData
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const emojiRef = useRef<any>();
  const fileInputRef = useRef<any>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddEmoji = (emoji: any) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (!socket) {
      console.error("Socket is not connected.");
      return;
    }
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userData.id || userData._id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: null,
        message,
      });
    } else if (selectedChatType === "channel") {
      socket.emit("send-channel-message", {
        sender: userData.id || userData._id,
        content: message,
        messageType: "text",
        fileUrl: null,
        message,
        channelId: selectedChatData._id,
      });
    }
    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (emojiRef && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerHeight < window.outerHeight * 0.75) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const attachmentClickHandler = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const changeAttachementHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await apiClient.post("/messages/upload-file", formData, {
          withCredentials: true,
        });

        if (res.status === 200 && res.data) {
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userData.id || userData._id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: res.data.path,
            });
          } else if (selectedChatType === "channel") {
            socket.emit("send-channel-message", {
              sender: userData.id || userData._id,
              content: undefined,
              messageType: "file",
              fileUrl: res.data.path,
              channelId: selectedChatData._id,
            });
          }
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 mb-0 flex h-auto items-center justify-center gap-2 bg-[#1c1d25] px-2 py-2 transition-all duration-300 sm:static sm:mb-4 sm:h-[8vh] sm:gap-4 sm:px-4 md:mb-6 md:h-[10vh] md:gap-6 md:px-6 ${
        isKeyboardOpen ? 'sm:mb-0' : ''
      }`}
    >
      <div className="flex flex-1 items-center gap-2 rounded-md bg-[#2a2b33] p-2 sm:gap-3 md:gap-5">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-md bg-transparent p-2 text-sm focus:border-none focus:outline-none sm:p-3 sm:text-base"
          placeholder="Enter message"
        />
        <button
          onClick={attachmentClickHandler}
          className="p-1 text-neutral-500 transition-all duration-300 focus:border-none focus:text-white focus:outline-none sm:p-2"
        >
          <GrAttachment className="text-lg sm:text-xl md:text-2xl" />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={changeAttachementHandler}
          accept=".png, .jpg, .jpeg, .svg, .webp"
        />
        <div className="relative">
          <button
            onClick={() => setEmojiPickerOpen(true)}
            className="p-1 text-neutral-500 transition-all duration-300 focus:border-none focus:text-white focus:outline-none sm:p-2"
          >
            <RiEmojiStickerLine className="text-lg sm:text-xl md:text-2xl" />
          </button>
          <div ref={emojiRef} className="absolute bottom-12 right-0 z-10 sm:bottom-14 md:bottom-16">
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
        className="flex items-center justify-center rounded-md bg-[#8417ff] p-3 transition-all duration-300 hover:bg-[#741bda] focus:border-none focus:bg-[#741bda] focus:text-white focus:outline-none sm:p-4 md:p-5"
      >
        <IoSend className="text-lg sm:text-xl md:text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;