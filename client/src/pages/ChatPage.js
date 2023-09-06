import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Maincontent from "../components/Maincontent";
import RightNav from "../components/header/RightNav";
import LeftNav from "../components/header/LeftNav";
import { useUserContext } from "../context/UserContext";
import useLogin from "../hooks/useLogin";

function ChatPage() {
  const login = useLogin();
  const { user, setUser } = useUserContext();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = (e) => {
    try {
      e.preventDefault();
      login(email, password);
      // setemail("");
      // setpassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div className="container-fluid">
        <div className="row" style={{ height: "100vh" }}>
          <div className="col col-md-3 col-lg-4 bg-secondary">
            <LeftNav />
            <Sidebar />
          </div>
          <div className="col bg-dark">
            <RightNav />
            <Maincontent />
          </div>
        </div>
      </div> */}
      <div className="text-light">
        <nav className="navbar d-flex">
          <h4 className="text-dark ms-3">{user?.fullName}</h4>
          {user ? (
            <div className="d-flex">
              <p className="text-primary me-2">{user.email}</p>
              <button
                className="btn btn-outline-danger me-3"
                onClick={() => {
                  localStorage.removeItem("chat-user");
                  setUser(null);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="d-flex">
              <input
                type="email"
                className="form-control me-3"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="email"
              />
              <input
                type="password"
                className="form-control me-3"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="password"
              />
              <button type="submit" className="btn btn-primary me-3">
                Login
              </button>
            </form>
          )}
        </nav>
        <div className="row" style={{ height: "100vh" }}>
          <div className="col col-3 bg-secondary">
            <Sidebar />
          </div>
          <div className="col bg-dark">
            <Maincontent />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
