import React from "react";
import ChatPage from "./pages/ChatPage";
import { io } from "socket.io-client";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

// const socket = io("http://localhost:4000");

// socket.on("connect", () => {
//   console.log(socket?.id, "app.js line 8");
// });

function App() {
  const { user } = useUserContext();

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!user ? <SignupPage /> : <Navigate to="/" />}
      />
      <Route path="/" element={user ? <ChatPage /> : <LoginPage />} />
    </Routes>
  );
}

export default App;
