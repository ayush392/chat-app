const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Chat = require("../models/chatModel");

// find all chats
router.get("/", async (req, res) => {
  const data = await Chat.find({});
  res.send(data);
});

// Create a new group chat
router.post("/group", async (req, res) => {
  try {
    let { chatname, members } = req.body;
    console.log(members);
    const newMembers = members.map((id) => new mongoose.Types.ObjectId(id));
    console.log(newMembers);
    const newGrp = await Chat.create({
      chatname: chatname,
      type: "group",
      members: newMembers,
    });
    res.json(newGrp);
  } catch (error) {
    res.status(500).json(error.message);
  }
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

// find or create a new private chat
router.post("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { id } = req.body;
    const uid1 = new mongoose.Types.ObjectId(id);
    const uid2 = new mongoose.Types.ObjectId(_id);

    const chat = await Chat.find({
      type: "private",
      members: { $all: [uid1, uid2] },
    });

    if (chat.length > 0) {
      res.json(chat);
    } else {
      const newChat = await Chat.create({
        chatname: "private",
        type: "private",
        members: [uid1, uid2],
      });
      res.status(201).json(newChat);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
