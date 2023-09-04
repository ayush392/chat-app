require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/dbConnect");

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

const app = express();

dbConnect();

// middleware
app.use(express.json());

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
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(`successfully connected ${socket.id}`);

  socket.on("send-msg", (msg, sender, roomId) => {
    console.log(sender + ": " + msg + " from " + roomId);
    io.to(roomId).emit("receive-msg", msg);
    // socket.broadcast.emit("receive-msg", msg, "server");
  });
});
