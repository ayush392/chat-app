import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

function NewGroupChat({ setIsGrpOpen, setNewChat }) {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState("");
  const { user, setSelectedChat, setFetchAgain } = useUserContext();

  useEffect(() => {
    fetch(`http://localhost:4000/api/user`)
      .then((res) => res.json())
      .then((json) => setAllUsers(json))
      .catch((error) => console.log(error));
  }, []);

  const addMember = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setAllUsers(allUsers.filter((u) => u !== user));
  };

  const removeMember = (user) => {
    setAllUsers([...allUsers, user]);
    setSelectedUsers(selectedUsers.filter((u) => u !== user));
  };

  const createNewGroup = async (e) => {
    e.preventDefault();
    let arr = [];
    selectedUsers.forEach((user) => {
      arr.push(user._id);
    });
    arr.push(user._id);
    const response = await fetch(`http://localhost:4000/api/chat/group`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        chatname: name,
        members: arr,
      }),
    });
    const json = await response.json();
    console.log(json, "45");
    if (response.ok) {
      setNewChat(json);
      setFetchAgain((prev) => !prev);
    }
    setIsGrpOpen(false);
  };

  return (
    <>
      {/* <div className=" bg-success-subtle" style={{ height: "3.175rem" }}></div> */}
      <div className="d-flex align-items-center p-3  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          style={{ width: "1.5rem" }}
          role="button"
          onClick={() => setIsGrpOpen(false)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <h6 className="ms-3 mb-0 ">Add group participants</h6>
      </div>
      <br />
      <div>
        <div>
          <form onSubmit={createNewGroup} className="d-flex mx-2 px-1">
            <input
              type="text"
              placeholder="Group Name"
              className="form-control form-control-sm "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button type="submit" className="btn ms-2   btn-sm btn-success ">
              Create
            </button>
          </form>
        </div>
        <div className="">
          {selectedUsers.map((user) => {
            return (
              <div key={user._id} className=" d-inline-block me-1">
                <span className=" rounded-pill ps-2 small">
                  {user.fullName}
                  <span
                    role="button"
                    className=" text-danger ms-1 px-1 rounded-pill "
                    onClick={() => removeMember(user)}
                  >
                    X
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="overflow-y-auto"
        style={{ height: "calc(100vh - 7.5rem)" }}
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
                    className="border-bottom border-secondary border-opacity-50 container-fluid py-2"
                    onClick={() => addMember(user)}
                  >
                    <div className="d-flex align-items-center py-1 ">
                      <img
                        src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                        alt="profile"
                        width={"40px"}
                        className="rounded-circle"
                      />
                      <p className="mb-0">{user.fullName}</p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default NewGroupChat;
