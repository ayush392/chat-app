const express = require("express");
const router = express.Router();
const Chat = require("../models/chatModel");

const dummychats = require("../data/chats");

router.get("/", async (req, res) => {
  // res.send(dummychats);
  const data = await Chat.find({});
  res.send(data);
});

// find all chats of a logged in user
router.get("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const chats = await Chat.find({
      members: { $elemMatch: { $eq: id } },
    }).populate("members");
    // console.log(chats);
    res.json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
