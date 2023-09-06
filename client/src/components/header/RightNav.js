import React from "react";
import { useUserContext } from "../../context/UserContext";

function RightNav() {
  const { user, selectedChat } = useUserContext();

  return (
    <nav className="navbar bg-body-secondary">
      <div className="container-fluid">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt="profile"
              width={"40px"}
              className="rounded-circle"
            />
            <p className="mb-0 ms-3">
              {selectedChat.type === "group"
                ? selectedChat.chatname
                : selectedChat && selectedChat.members[0]._id == user._id
                ? selectedChat.members[1].fullName
                : selectedChat && selectedChat.members[0].fullName}
            </p>
          </div>
          <div className="d-flex">
            <div className="icon1">🤵</div>
            <div className="icon2">👨🏻‍🤝‍👨🏻</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default RightNav;
