import React from "react";
import { useUserContext } from "../context/UserContext";

function GroupInfo({ setIsGrpInfo }) {
  const { user, selectedChat } = useUserContext();

  return (
    <div>
      <nav className="navbar  " style={{ height: "56px" }}>
        <div className="container-fluid">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <p className="m-0">Details</p>
            <button
              className="btn btn-sm btn-close"
              onClick={() => setIsGrpInfo(false)}
            ></button>
          </div>
        </div>
      </nav>

      <div className="overflow-y-auto" style={{ height: "calc(100vh - 59px)" }}>
        <div>
          <div className="d-flex py-4 mb-3 flex-column align-items-center bg-black bg-opacity-25">
            <img
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt="group profile"
              width={"50%"}
              className="rounded-circle"
            />
            <h4 className="mb-0 mt-3">
              {selectedChat.type === "group"
                ? selectedChat.chatname
                : selectedChat?.members[0]._id === user._id
                ? selectedChat?.members[1].fullName
                : selectedChat?.members[0].fullName}
            </h4>
          </div>

          {selectedChat && selectedChat.type === "group" && (
            <div className="bg-black bg-opacity-25">
              <div className="navbar border-bottom border-secondary border-opacity-25 ">
                <div className="container-fluid">
                  <div className="w-100 py-2 d-flex align-items-center">
                    <p className="m-0 ms-2">👬</p>
                    <p className="m-0 ms-2">
                      Members ({selectedChat.members.length})
                    </p>
                  </div>
                </div>
              </div>

              {selectedChat &&
                selectedChat?.members.map((user) => {
                  return (
                    <div key={user._id} className="container-fluid py-2">
                      <div className="d-flex align-items-center py-1 ">
                        <img
                          src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                          alt="profile"
                          width={"40px"}
                          className="rounded-circle"
                        />
                        <p className="mb-0 ms-3">{user.fullName}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupInfo;
