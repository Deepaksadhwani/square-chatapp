import { AppDispatch, RootState } from "@/store/app-store";
import {
  addChannelInChannelList,
  addMessage,
  fetchContacts,
} from "@/store/slices/chat-slice";
import { useContext, useEffect, createContext, useRef, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface socketProviderTypes {
  children: ReactNode;
}

export const SocketProvider = ({ children }: socketProviderTypes) => {
  const socket = useRef<any>();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user.userData);
  const selectedChatType = useSelector(
    (state: RootState) => state.chat.selectedChatType,
  );
  const selectedChatData = useSelector(
    (state: RootState) => state.chat.selectedChatData,
  );
  // facing issue if do not keep varible inside in component useeffect does not work if pass this two varible in dependancy array
  if (selectedChatData && selectedChatType) console.log("UserChat section"); // random condtion to pass run  build to use this varible
  useEffect(() => {
    if (userData) {
      socket.current = io("http://localhost:3000/", {
        withCredentials: true,
        query: { userId: userData.id || userData._id },
      });

      socket.current.on("connect", () => {});

      const handleReceiveMessage = (message: any) => {
        dispatch(addMessage(message));
        dispatch(fetchContacts());
      };
      const handleReceiveChannelMessage = (message: any) => {
        dispatch(addMessage(message));
        dispatch(addChannelInChannelList(message));
      };
      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("receive-channel-message", handleReceiveChannelMessage);
      return () => socket.current.disconnect();
    }
  }, [userData]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
