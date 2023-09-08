import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-user"));
    console.log(user);
    // console.log("user name is testuser1");
    setUser(user);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        fetchAgain,
        setFetchAgain,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserContextProvider };
