import React from "react";
import ChatPage from "./pages/ChatPage";
import { io } from "socket.io-client";

// const socket = io("http://localhost:4000");

// socket.on("connect", () => {
//   console.log(socket?.id, "app.js line 8");
// });

function App() {
  return (
    <>
      <ChatPage />
    </>
  );
}

export default App;
