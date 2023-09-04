const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatname: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ["private", "group"],
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  latestMsg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
});

module.exports = mongoose.model("Chat", chatSchema);
