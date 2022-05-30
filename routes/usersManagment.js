const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/auth");
const usersBL = require("../models/usersBL");
const jwt = require("jsonwebtoken");

// Verifies the user token and renders the menu page for him
router.get("/", verifyAccessToken, async (req, res, next) => {
  const users = await usersBL.getUsers();
  if (users.users[0].username != req.session.authenticated.username) {
    res.send("You are not logged in as admin");
  }
  // console.log(users);
  res.clearCookie("userToUpdate");
  res.render("usersManagment", { users: users.users });
});

router.get("/:username", verifyAccessToken, async (req, res, next) => {
  console.log(req.params);
  usersBL.deleteUser(req.params.username);

  res.redirect("/menu");
});

module.exports = router;
