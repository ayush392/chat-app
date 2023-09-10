const router = require("express").Router();
const {
  loginUser,
  signupUser,
  getAllUsers,
} = require("../controllers/userController");

// Get all the users
router.get("/", getAllUsers);

// Signup a user
router.post("/signup", signupUser);

// Login a user
router.post("/login", loginUser);

module.exports = router;
