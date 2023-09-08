const router = require("express").Router();
const dummyMessages = require("../data/messages");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

// router.get("/", async (req, res) => {
//   const msg = await Message.find({});
//   res.json(msg);
// });

// POST a new message
router.post("/", async (req, res) => {
  try {
    const { userId, chatId, content } = req.body;
    console.log(req.body);

    const data = await Message.create({
      chat: chatId,
      content: content,
      sender: userId,
    });
    const update = await Chat.findByIdAndUpdate(
      { _id: chatId },
      { latestMsg: data._id }
    );
    const msg = await Message.findOne({ _id: data._id }).populate("chat");

    // console.log(update);
    // console.log(data, 20);
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// find all msg of selected chat
router.get("/:id", async (req, res) => {
  try {
    const chatId = req.params.id;
    const data = await Message.find({ chat: chatId }).populate("chat");
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
