import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

function Sidebar() {
  const [chatdata, setChatdata] = useState([]);
  //   const [selectedChat, setSelectedChat] = useState("");
  const { user, selectedChat, setSelectedChat } = useUserContext();

  useEffect(() => {
    user &&
      fetch(`http://localhost:4000/api/chat/${user?._id}`)
        .then((res) => res.json())
        .then((json) => setChatdata(json))
        .catch((e) => console.log(e));
  }, [user]);

  return (
    <>
      <h5>Chats {user?.name}</h5>
      <br />
      {chatdata &&
        chatdata.map((data, index) => {
          return (
            <div
              onClick={() => setSelectedChat(data)}
              role="button"
              key={index}
              className={
                data._id === selectedChat._id
                  ? "bg-dark d-flex flex-column ms-3"
                  : "d-flex flex-column ms-3"
              }
            >
              <p className="m-0">{data.chatname}</p>
              <p className="">
                {/* <small>{data.latestMsg.sender.name}: </small> */}
                <small>{data?.latestMsg?.content}</small>
              </p>
              <hr />
            </div>
          );
        })}
    </>
  );
}

export default Sidebar;
