const express = require("express");
const router = express.Router();
const usersBL = require("../models/usersBL");
const sessionBL = require("../models/sessionBL");

// Renders the login page
router.get("/", async (req, res, next) => {
  req.session.authenticated ? res.redirect("/menu") : res.render("login", {});
});

// Logs the user out and end the session
router.get("/logout", (req, res, next) => {
  req.session = null;
  res.redirect("/");
});

// Check user credentials, allows login and redirects to the menu page
router.post("/", async (req, res, next) => {
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
      await sessionBL.getData(req.body.username);
      if (!(await sessionBL.getData(req.body.username)))
        try {
          await sessionBL.saveDate({
            User: user.user.username,
            Transactions: user.user.transactions,
            Date: new Date(),
          });
        } catch (e) {
          console.log(e);
        }
    }
    const userDBdata = await sessionBL.getData(req.body.username);
    if (
      userDBdata.Transactions != 0 ||
      (await sessionBL.checkDate(req.body.username))
    ) {
      res.redirect("/menu");
    } else {
      try {
        res.render("error", {
          message:
            "You've exceeded the limit of transactions for those 24 hours, please try again the next day",
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
});

module.exports = router;
