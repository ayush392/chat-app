import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";

function Sidebar() {
  const [chatdata, setChatdata] = useState([]);
  const { user, selectedChat, setSelectedChat } = useUserContext();
  const socket = useSocket();

  useEffect(() => {
    socket && chatdata && socket.emit("init-auto-join", chatdata);
  }, [chatdata]);

  useEffect(() => {
    user &&
      fetch(`http://localhost:4000/api/chat/${user._id}`)
        .then((res) => res.json())
        .then((json) => setChatdata(json))
        .catch((e) => console.log(e));
  }, [user]);

  return (
    <>
      {chatdata &&
        chatdata.map((data, index) => {
          return (
            <div
              key={data._id}
              role="button"
              onClick={() => {
                console.log(data.chatname);
                setSelectedChat(data);
              }}
              className={
                data._id === selectedChat?._id
                  ? "bg-success-subtle container-fluid py-2 overflow-y-auto border-bottom"
                  : "container-fluid py-2 overflow-y-auto h border-bottom "
              }
            >
              <div className="d-flex align-items-center py-1 ">
                <img
                  src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  alt="profile"
                  width={"50px"}
                  className="rounded-circle"
                />
                <div className="d-flex flex-column ms-1 ps-2 ">
                  <p className="mb-0">
                    {data.type === "group"
                      ? data.chatname
                      : data && data.members[0]._id == user._id
                      ? data.members[1].fullName
                      : data && data.members[0].fullName}
                  </p>
                  <small className="text-secondary">
                    name: latest messages
                  </small>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Sidebar;
