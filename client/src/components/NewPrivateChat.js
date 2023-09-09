import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

function NewPrivateChat({ setIsOpen, setSelectedUser, selectedUser }) {
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useUserContext();

  // const [selectedUser, setSelectedUser] = useState("");
  // const [isOpen, setIsOpen] = useState();
  useEffect(() => {
    fetch(`http://localhost:4000/api/user`)
      .then((res) => res.json())
      .then((json) => setAllUsers(json))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className=" bg-success" style={{ height: "3.175rem" }}></div>
      <div className="d-flex align-items-center  bg-success p-3  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          style={{ width: "1.5rem" }}
          role="button"
          onClick={() => setIsOpen(false)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <h4 className="ms-3 mb-0 ">New chat</h4>
      </div>
      <div
        className="overflow-y-auto"
        style={{ height: "calc(100vh - 118px)" }}
      >
        <div>
          {allUsers &&
            allUsers
              .filter((u) => u._id !== user._id)
              .map((user) => {
                return (
                  <div
                    key={user._id}
                    role="button"
                    className={`${
                      selectedUser._id === user._id && " bg-black bg-opacity-25"
                    } border-bottom border-secondary  border-opacity-50 container-fluid py-2`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="d-flex align-items-center py-1 ">
                      <img
                        src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                        alt="profile"
                        width={"50px"}
                        className="rounded-circle"
                      />
                      <div className="d-flex flex-column ms-1 ps-2 ">
                        <p className="mb-0">{user.fullName}</p>
                        <small className="text-secondary">
                          {`Hey, I am ${user.fullName}`}
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

export default NewPrivateChat;
