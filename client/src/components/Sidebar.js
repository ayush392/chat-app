import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";

function Sidebar({ newChat, setNewChat }) {
  const [chatdata, setChatdata] = useState([]);
  const { user, selectedChat, setSelectedChat, fetchAgain } = useUserContext();
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
  }, [user, fetchAgain]);

  useEffect(() => {
    if (newChat !== "") {
      const schat =
        chatdata && chatdata.filter((chat) => chat._id === newChat._id);
      if (schat.length > 0) {
        console.log(schat[0], "27");
        setSelectedChat(schat[0]);
        setNewChat("");
      }
    }
  }, [chatdata]);

  return (
    <>
      <div
        className="overflow-y-auto bg-black bg-opacity-50"
        style={{ height: "calc(100vh - 59px)" }}
      >
        <div>
          {chatdata.length > 0 &&
            chatdata.map((data) => {
              return (
                <div
                  key={data._id}
                  role="button"
                  onClick={() => setSelectedChat(data)}
                  className={`${
                    data._id === selectedChat?._id
                      ? " bg-dark border-start border-3 border-success "
                      : "border-bottom border-secondary border-opacity-50"
                  } container-fluid py-2`}
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
                          : data && data.members[0]._id === user._id
                          ? data.members[1].fullName
                          : data && data.members[0].fullName}
                      </p>
                      <small className="text-secondary small">
                        {`${chatdata?.latestMsg?.content}`}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
