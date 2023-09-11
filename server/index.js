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

  socket.on("init-auto-join", (chats, userId) => {
    socket.join(userId);
    chats.forEach((chat) => {
      socket.join(chat._id);
      console.log(`joined ${chat.chatname}`);
    });
  });

  socket.on("new-chat", (chat) => {
    console.log("new chat msg received", chat);
    chat.members.forEach((mem) => {
      socket.to(mem._id).emit("start-new-chat", mem._id);
    });
  });

  socket.on("send-msg", (msg) => {
    socket.to(msg.chat._id).emit("receive-msg", msg);
  });

  socket.off("init-auto-join", (chats) => {
    chats.forEach((chat) => {
      socket.leave(chat._id);
      console.log(`User Left ${chat.chatname}`);
    });
  });
});
