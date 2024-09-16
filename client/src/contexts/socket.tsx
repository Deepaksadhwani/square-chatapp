import { RootState } from "@/store/app-store";
import { useContext, useEffect, createContext, useRef, ReactNode } from "react";
import { useSelector } from "react-redux";
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
  const userData = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (userData) {
      socket.current = io("http://localhost:3000/", {
        withCredentials: true,
        query: { userId: userData._id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server.");
      });
      return () => socket.current.disconnect();
    }
  }, [userData]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
