import React, { useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { UserContext } from "./context/UserContext";
import useLogin from "./hooks/useLogin";

// socket.on("connect", () => {
//   console.log(socket?.id);
// });

function App() {
  const [msg, setmsg] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const login = useLogin();

  function sendMessage() {
    if (socket === null) {
      alert("join any room");
      return;
    }
    socket.emit("send-msg", "hello there", "client", roomId);
    // console.log("function");
  }

  function handleConnect(e) {
    e.preventDefault();
    console.log(roomId);
    // setmsg("");
    const newSocket = io("http://localhost:4000", { query: { id: roomId } });
    setSocket(newSocket);
  }

  useEffect(() => {
    if (socket === null) return;
    console.log("inside use effect");
    socket.on("receive-msg", (a) => {
      console.log(a);
      setmsg(a);
    });
  }, [socket, msg]);

  return (
    <>
      <div className="App">
        {msg && <p>{msg}</p>}
        <h1>{roomId}</h1>
        {/* {console.log(setUser)} */}
        <button onClick={sendMessage}>send</button>
        <button onClick={() => setUser("hi")}>do it</button>
        <button onClick={() => login()}>login</button>
      </div>
      <div>
        <form onSubmit={handleConnect}>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button type="submit">Connect</button>
        </form>
      </div>
    </>
  );
}

export default App;
