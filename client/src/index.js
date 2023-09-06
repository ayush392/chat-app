import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SocketProvider } from "./context/SocketContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <UserContextProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </UserContextProvider>
  // </React.StrictMode>
);
