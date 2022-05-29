const express = require("express");
const router = express.Router();
const usersBL = require("../models/usersBL");
const sessionBL = require("../models/sessionBL");

// Renders the login page
router.get("/", async (req, res) => {
  req.session.authenticated ? res.redirect("/menu") : res.render("login", {});
});

// Check user credentials, allows login and redirects to the menu page
router.post("/", async (req, res) => {
  const user = await usersBL.checkCred(req.body);

  if (user == null) {
    res.render("error", { message: "Username or Password were incorrect" });
  } else {
    let token = usersBL.jwtGenerateToken(user);

    if (!req.session.authenticated) {
      req.session.authenticated = {
        username: req.body.username,
        transactions: user.user.transactions,
        dateLoggedIn: new Date(),
        token,
      };
      sessionBL.saveDate({
        User: user.user.username,
        Transactions: user.user.transactions,
        Date: new Date(),
      });
    }

    // console.log(req.session.authenticated);

    res.redirect("/menu");
  }
});

module.exports = router;
