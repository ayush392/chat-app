const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Chat = require("../models/chatModel");

// find all chats
router.get("/", async (req, res) => {
  const data = await Chat.find({});
  res.send(data);
});

router.delete("/delete", async (req, res) => {
  try {
    const d = await Chat.deleteMany({ chatname: "private" });
    res.json(d);
  } catch (error) {
    res.json(error.message);
  }
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
    const data = await Chat.findOne({ _id: newGrp._id }).populate("members");
    // console.log(data);
    res.json(data);
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
    })
      .populate("members")
      .populate("latestMsg");
    // console.log(chats);
    res.json(chats);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// find or create a new private chat
router.post("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { id } = req.body;
    let uid1 = new mongoose.Types.ObjectId(id);
    let uid2 = new mongoose.Types.ObjectId(_id);

    const chat = await Chat.findOne({
      $and: [{ type: "private" }, { members: { $all: [uid1, uid2] } }],
    }).populate("members");

    if (chat !== null) {
      res.json(chat);
    } else {
      let arr = [uid1, uid2];
      const newChat = await Chat.create({
        chatname: "private",
        type: "private",
        members: arr,
      });
      const data = await Chat.findOne({ _id: newChat._id }).populate("members");
      res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
