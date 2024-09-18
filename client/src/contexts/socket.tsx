import { AppDispatch, RootState } from "@/store/app-store";
import { addMessage } from "@/store/slices/chat-slice";
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
  console.log(selectedChatData, selectedChatType);
  useEffect(() => {
    if (userData) {
      socket.current = io("http://localhost:3000/", {
        withCredentials: true,
        query: { userId: userData.id || userData._id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server.");
      });

      const handleReceiveMessage = (message: any) => {
        console.log(selectedChatData, selectedChatType);

        console.log("message received", message);
        dispatch(addMessage(message));
      };

      socket.current.on("receiveMessage", handleReceiveMessage);

      return () => socket.current.disconnect();
    }
  }, [userData]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
