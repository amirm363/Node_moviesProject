const express = require("express");
const router = express.Router();
const usersBL = require("../models/usersBL");

// Renders createUser page
router.get("/", (req, res, next) => {
  res.render("createUser", {});
});
// Creates new user
router.post("/", async (req, res, next) => {
  console.log(await usersBL.addUser(req.body));
  res.redirect("/");
});

module.exports = router;
