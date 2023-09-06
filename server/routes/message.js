const router = require("express").Router();
const dummyMessages = require("../data/messages");
const Message = require("../models/messageModel");

router.get("/", async (req, res) => {
  const msg = await Message.find({});
  res.json(msg);
});

router.post("/", async (req, res) => {
  try {
    const { userId, chatId, content } = req.body;
    console.log(req.body);

    const data = await Message.create({
      chat: chatId,
      content: content,
      sender: userId,
    });
    const msg = await Message.findOne({ _id: data._id }).populate("chat");
    // console.log(data, 20);
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find all msg of selected chat
router.get("/:id", async (req, res) => {
  try {
    const chatId = req.params.id;
    const data = await Message.find({ chat: chatId }).populate("chat");
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
