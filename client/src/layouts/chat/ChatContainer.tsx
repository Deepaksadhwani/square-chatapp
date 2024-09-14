import ChatHeader from "./ChatContainer/ChatHeader";
import MessageBar from "./ChatContainer/MessageBar";
import MessageContainer from "./ChatContainer/MessageContainer";

const ChatContainer = () => {
  return (
    <div className="fixed top-0 h-screen w-screen bg-[#1c1d25] md:static md:flex-1">
      <ChatHeader/>
      <MessageContainer />
      <MessageBar />
    </div>
  );
};

export default ChatContainer;
