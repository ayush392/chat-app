const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ fullName: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName: name,
      email,
      password: hash,
    });
    const token = createToken(newUser._id);

    res.json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    console.log(data, 28);
    const match = bcrypt.compare(password, data.password);
    if (!match) res.status(400).json("incorrect password");

    const token = createToken(data._id);
    res.json({
      _id: data._id,
      fullName: data.fullName,
      email: data.email,
      token,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { loginUser, signupUser, getAllUsers };
