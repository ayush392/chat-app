const router = require("express").Router();
const User = require("../models/userModel");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).sort({ fullName: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "user already exists" });
    }
    const newUser = await User.create({ fullName: name, email, password });
    res.json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    console.log(data, 28);
    if (data.password === password) res.json(data);
    else res.status(400).json("incorrect password");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
