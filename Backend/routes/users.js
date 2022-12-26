const express = require("express");

const User = require("../models/usersModel");

const { userLogin, userSignup } = require("../controllers/userCont");
const router = express.Router();

//login route
router.post("/login", userLogin);

//signup route
router.post("/signup", userSignup);

router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

module.exports = router;
