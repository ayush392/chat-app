import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";

function Maincontent() {
  const [message, setmessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useSocket();
  const { user, selectedChat } = useUserContext();

  useEffect(() => {
    selectedChat &&
      fetch(`http://localhost:4000/api/message/${selectedChat._id}`)
        .then((res) => res.json())
        .then((json) => setmessage(json))
        .catch((e) => console.log(e));
  }, [selectedChat]);

  useEffect(() => {
    socket && socket.emit("init-auto-join", user);
  }, [user]);

  useEffect(() => {
    // console.log("h");
    socket &&
      socket.on("receive-msg", (msg) => {
        if (selectedChat._id === msg.chat._id) {
          setmessage([...message, msg]);
          console.log("msg received");
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
    if (response.ok) console.log(json);
  };

  return (
    <>
      <div className="mb-2 overflow-y-scroll" style={{ height: "91%" }}>
        {selectedChat === "" ? (
          <h3 className="text-secondary m-auto">No msg to display</h3>
        ) : (
          <>
            <div className="mb-2" style={{ height: "91%" }}>
              {message &&
                message.map((m, i) => {
                  return <p key={i}>{m.content}</p>;
                })}
            </div>
            <form onSubmit={handleSubmit} className="d-flex">
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
          </>
        )}
      </div>
    </>
  );
}

export default Maincontent;
