import React from "react";
import { useUserContext } from "../context/UserContext";

/*
- create new chat
- fetch all chats again
- setSelectedChat
- connect to socket.io
*/

function ConfirmBox({ selectedUser, setSelectedUser, setNewChat, setIsOpen }) {
  const { user, setSelectedChat, setFetchAgain } = useUserContext();
  console.log(selectedUser);

  const createNewChat = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/chat/${user._id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: selectedUser._id }),
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      setSelectedUser("");
      setNewChat(json);
      setFetchAgain((prev) => !prev);
    } else {
      alert("error");
    }
    setIsOpen(false);
  };

  return (
    <div
      className="d-flex flex-column  justify-content-center align-items-center text-secondary "
      style={{ height: "100vh" }}
    >
      <h1>Click the button to start chat with {selectedUser.fullName}</h1>
      <button className="btn btn-primary" onClick={createNewChat}>
        Send message
      </button>
    </div>
  );
}

export default ConfirmBox;
