import React from "react";
import { useUserContext } from "../../context/UserContext";

function LeftNav({ setIsOpen, setIsGrpOpen }) {
  const { user } = useUserContext();
  return (
    <nav className="navbar bg-body-secondary">
      <div className="container-fluid">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="avatar">
            <img
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt="profile"
              width={"40px"}
              className="rounded-circle"
            />
            <span className="ms-2">{user && user.fullName}</span>
          </div>
          <div className="d-flex">
            <div
              role="button"
              onClick={() => setIsOpen(true)}
              className="icon1 me-2"
            >
              🤵
            </div>
            <div
              className="icon2"
              role="button"
              onClick={() => setIsGrpOpen(true)}
            >
              👨🏻‍🤝‍👨🏻
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LeftNav;
