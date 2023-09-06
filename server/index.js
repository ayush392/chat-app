require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/dbConnect");
const cors = require("cors");

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

const app = express();

dbConnect();

// middleware
app.use(cors({ Credential: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("hello world!");
});

const server = app.listen(4000, () => {
  console.log("server started in port 4000");
});

const io = require("socket.io")(server, {
  // pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // console.log(socket.rooms);
  console.log(`successfully connected ${socket.id}`);

  // join room when user click on 'Join group' button or start a new private chat
  socket.on("join-room", (id, cb) => {
    console.log(socket.rooms);
    cb(`joined ${id}`);
  });

  socket.on("init-auto-join", (user) => {
    socket.join(user._id);
    console.log(user._id + ` joined`);
  });

  // socket.on("try-send", (msg) => {
  //   console.log("message received: ", msg);
  //   // const newMsg = "hurrey.... " + msg;
  //   socket.broadcast.emit("try-receive", msg);
  // });

  socket.on("send-msg", (msg) => {
    // const x = chats.filter(chat => chat._id===chatId);
    // if(x.length < 1){
    //   console.log('No chat exist');
    //   return;
    // }
    const members = msg.chat.members.filter((id) => id !== msg.sender);

    members.forEach((id) => socket.to(id).emit("receive-msg", msg));

    // console.log(sender + ": " + msg + " from " + roomId);
    // socket.broadcast.emit("receive-msg", msg, "server");
  });

  socket.off("init-auto-join", (user) => {
    socket.emit("user left");
    socket.leave(user._id);
  });
});
