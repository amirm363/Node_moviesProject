const express = require("express");
const router = express.Router();
const usersBL = require("../models/usersBL");
const jwt = require("jsonwebtoken");

// Renders the login page
router.get("/", async (req, res, next) => {
  res.render("login", {});
});

// Check user credentials, allows login and redirects to the menu page
router.post("/", async (req, res, next) => {
  // console.log(req.body);
  let user = await usersBL.checkCred(req.body);
  // console.log(user);
  let token = {};
  if (user == null) {
    res.render("error", { message: "Username or Password were incorrect" });
  } else {
    token = usersBL.jwtGenerateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.redirect("/menu");
  }
});

module.exports = router;
