const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const usersBL = require("../models/usersBL");

router.get("/", auth.verifyAccessToken, (req, res, next) => {
  let user = null;
  res.render("userData", { user });
});

router.get("/:username", auth.verifyAccessToken, async (req, res, next) => {
  const users = await usersBL.getUsers();
  let user = users.users.find((u) => u.username == req.params.username);
  res.cookie("user", user, {
    httpOnly: true,
  });

  res.render("userData", { user });
});

router.post("/", auth.verifyAccessToken, async (req, res, next) => {
  //   console.log(req.cookies);
  let users = await usersBL.getUsers();
  if (req.cookies.user != null) {
    userIndex = users.users.findIndex(
      (user) => user.username == req.cookies.user.username
    );
  } else {
    userIndex = -1;
  }
  console.log(userIndex);

  if (userIndex != -1) {
    users.users[userIndex] = {
      username: req.body.username,
      password: req.body.password,
      date: req.body.date,
      transactions: req.body.transactions,
    };
    console.log(users.users);
    await usersBL.updateUser(users);
    res.redirect("/usersManagment");
  } else {
    console.log(req.body.date);
    usersBL.addUser({
      username: req.body.username,
      password: req.body.password,
      date: new Date(req.body.date),
      transactions: req.body.transactions,
    });
    res.redirect("/usersManagment");
  }
});

module.exports = router;
