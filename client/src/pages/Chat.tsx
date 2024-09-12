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
  return <div>Chat</div>;
};

export default Chat;
