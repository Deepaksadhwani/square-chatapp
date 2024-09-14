import ChatContainer from "@/layouts/chat/ChatContainer";
import ContactContainer from "@/layouts/chat/ContactContainer";
import EmptyChatContainer from "@/layouts/chat/EmptyChatContainer";
import { RootState } from "@/store/app-store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const userProfileStatus = useSelector(
    (state: RootState) => state.user.userData?.profileSetup,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfileStatus) {
      toast.error("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [navigate, userProfileStatus]);
  return (
    <div className="flex h-screen overflow-hidden text-white">
      <ContactContainer />
      {/* <EmptyChatContainer /> */}
      <ChatContainer />
    </div>
  );
};

export default Chat;
