const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const usersBL = require("../models/usersBL");
const jwt = require("jsonwebtoken");

// Verifies the user token and renders the menu page for him
router.get("/", auth.verifyAccessToken, async (req, res, next) => {
  const users = await usersBL.getUsers();
  if (
    users.users[0].username !=
    jwt.verify(req.cookies.token, process.env.MY_SECRET).user.username
  ) {
    res.send("You are not logged in as admin");
  }
  console.log(users);
  res.render("usersManagment", { users: users.users });
});

router.get("/:username", auth.verifyAccessToken, async (req, res, next) => {
  usersBL.deleteUser(req.params.username);
  let user = 0;
  res.redirect("/menu");
});

module.exports = router;
