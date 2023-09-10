import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    try {
      e.preventDefault();
      login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const generateGuestData = () => {
    setEmail("test1@gm.co");
    setPassword("123456");
  };

  return (
    <div className="container-fluid bg-dark text-light">
      <div className="row" style={{ width: "100vw", height: "100vh" }}>
        <div className="col-lg-5 col-md-6 col-sm-8 col-xxl-4  m-auto p-5 shadow-lg ">
          <h2 className=" mb-5 text-center ">Welcome back!</h2>

          <form onSubmit={handleLogin} className="m-3">
            <label className=" form-label ">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mb-3"
              placeholder="Enter your email address"
            />

            <label className="form-label ">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mb-3 "
              placeholder="Enter password"
            />
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
            <hr />
            <button
              className="btn btn-outline-danger w-100 "
              onClick={generateGuestData}
            >
              Get Guest Credentials
            </button>
          </form>

          <p className=" text-secondary text-center">
            Don't have an account? Click here to signup
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
