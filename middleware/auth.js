const jwt = require("jsonwebtoken");
const sessionBL = require("../models/sessionBL");

// Middleware to authenticate users
const verifyAccessToken = (req, res, next) => {
  try {
    const verified = jwt.verify(
      req.session.authenticated.token,
      process.env.MY_SECRET
    );

    req.user = verified;
    next();
  } catch {
    return res.redirect("http://localhost:3000/");
  }
};

const updateTransactions = async (req, res, next) => {
  console.log("+++++++++++++++++++++++++++++++++++++");
  user = await sessionBL.getData(req.session.authenticated.username);
  console.log(user.Transactions);
  if (user.Transactions > 0) {
    try {
      await sessionBL.updateData(req.session.authenticated.username);
      console.log("---------------------------");
      next();
    } catch (e) {
      console.log(e);
    }
  } else if (user.Transactions == 0) {
    try {
      res.render("error", {
        message: "You are out of transactions, you'll be logged out now.",
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    next();
  }
};

module.exports = { verifyAccessToken, updateTransactions };
