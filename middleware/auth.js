const jwt = require("jsonwebtoken");
const usersBL = require("../models/usersBL");
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
    res.redirect(403, "http://localhost:3000/");
  }
};

const updateData = async (req, res, next) => {
  if (req.session.authenticated.transaction == "00") {
    next();
  }
  userData = await sessionBL.getData(req.session.authenticated.username);
  console.log(userData);
  next();
};

module.exports = { verifyAccessToken, updateData };
