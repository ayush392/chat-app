import { useState, createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:4000");

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("connected to ", newSocket.id);
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
