import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SocketProvider } from "./context/SocketContext";
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserContextProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </UserContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
