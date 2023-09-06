const mongoose = require("mongoose");
// 1. 64f770ac7126575da849f660
// 2. 64f771277126575da849f661
// 3. 64f771857126575da849f662
// 4. 64f771e27126575da849f663

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
    default: "dummy",
  },
});

module.exports = mongoose.model("Chat", chatSchema);
