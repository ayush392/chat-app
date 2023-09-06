const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
});

module.exports = mongoose.model("Message", messageSchema);
