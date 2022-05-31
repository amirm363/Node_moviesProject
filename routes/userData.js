const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/auth");
const usersBL = require("../models/usersBL");

//Route to the page that allows admin editing users.
router.get("/", verifyAccessToken, (req, res, next) => {
  let user = null;
  res.render("userData", { user });
});

// Route that gets the data of the user to update from the route parameters
router.get("/:username", verifyAccessToken, async (req, res, next) => {
  const users = await usersBL.getUsers();
  let userToUpdate = users.users.find((u) => u.username == req.params.username);
  req.session.userToUpdate = userToUpdate;

  res.render("userData", { user: userToUpdate });
});

// Route with logic of updating or adding a new user with admin privileges
router.post("/", verifyAccessToken, async (req, res, next) => {
  let users = await usersBL.getUsers();
  console.log(req.session.userToUpdate);
  if (req.session.userToUpdate != null) {
    userIndex = users.users.findIndex(
      (user) => user.username == req.session.userToUpdate.username
    );
  } else {
    userIndex = -1;
  }

  if (userIndex != -1) {
    users.users[userIndex] = {
      username: req.body.username,
      password: req.body.password,
      date: new Date(req.body.date).toLocaleDateString("iw-IL"),
      transactions: req.body.transactions,
    };
    await usersBL.updateUser(users);
    res.redirect("/usersManagment");
  } else {
    usersBL.addUser({
      username: req.body.username,
      password: req.body.password,
    });
    res.redirect("/usersManagment");
  }
});

module.exports = router;
