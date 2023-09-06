import React, { useEffect, useState, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";
import RightNav from "./header/RightNav";

function Maincontent() {
  const [message, setmessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [msgg, setmsgg] = useState("");
  const socket = useSocket();
  const { user, selectedChat } = useUserContext();
  let count = 0;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [msgg, message]);

  const fetchChats = () => {
    fetch(`http://localhost:4000/api/message/${selectedChat._id}`)
      .then((res) => res.json())
      .then((json) => setmessage(json))
      .catch((e) => console.log(e));
    console.log(`data fetched`);
  };

  useEffect(() => {
    selectedChat && fetchChats();
  }, [selectedChat, msgg]);

  useEffect(() => {
    socket &&
      socket.on("receive-msg", (msg) => {
        if (selectedChat._id == msg.chat._id) {
          setmsgg(msg);
        }
      });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:4000/api/message`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        chatId: selectedChat._id,
        content: newMessage,
      }),
    });

    const json = await response.json();

    socket.emit("send-msg", json);
    setmessage([...message, json]);
    setNewMessage("");
  };

  return (
    <>
      {!selectedChat ? (
        <div
          className="d-flex justify-content-center align-items-center text-secondary "
          style={{ height: "100vh" }}
        >
          <h1>Select chat and start chatting</h1>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <RightNav />
          <div
            className="bg-danger-subtle overflow-y-auto overflow-x-hidden "
            style={{ height: "calc(100vh - 118px)" }}
          >
            <br />
            <div className="mx-2 mx-md-3 mx-lg-5 mb-3 ">
              {message &&
                message.map((m) => {
                  return (
                    <p
                      key={m._id}
                      className={
                        user._id === (m.sender?._id || m.sender)
                          ? "my-1 mb-3 text-end"
                          : "my-1 mb-3 text-start"
                      }
                    >
                      <span
                        className={
                          user._id === m.sender
                            ? "px-2 py-2 bg-success-subtle rounded"
                            : "px-2 py-2 bg-info-subtle rounded"
                        }
                      >
                        {m.content}
                      </span>
                    </p>
                  );
                })}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="container-fluid py-2 bg-secondary-subtle ">
            <form onSubmit={handleSubmit} className="d-flex py-1">
              <input
                type="text"
                value={newMessage}
                className="form-control"
                onChange={(e) => setNewMessage(e.target.value)}
                required
              />
              <button className="btn btn-light ms-2" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* <div className="mb-2 overflow-y-scroll" style={{ height: "91%" }}>
        {selectedChat === "" ? (
          <h3 className="text-secondary m-auto">No msg to display</h3>
        ) : (
          <>
            <RightNav />
            <div className="mb-2" style={{ height: "91%" }}>
              {message &&
                message.map((m, i) => {
                  return <p key={i}>{m.content}</p>;
                })}
            </div>
          </>
        )}
      </div> */}
    </>
  );
}

export default Maincontent;
