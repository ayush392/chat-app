import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

function SignupPage() {
  const signup = useSignup();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    try {
      e.preventDefault();
      signup(name, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid bg-dark text-light">
      <div className="row" style={{ width: "100vw", height: "100vh" }}>
        <div className="col-lg-5 col-md-6 col-sm-8 col-xxl-4 m-auto p-5 shadow-lg ">
          <h2 className=" mb-5 text-center ">Signup!</h2>

          <form onSubmit={handleSignup} className="m-3">
            <label className=" form-label ">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control mb-3"
              placeholder="Enter your full name"
            />

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
              Signup
            </button>
          </form>

          <p className=" text-secondary text-center">
            Already have an account? Click here to Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
