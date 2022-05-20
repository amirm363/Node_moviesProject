const jwt = require("jsonwebtoken");
const usersBL = require("../models/usersBL");

// Middleware to authenticate users
const verifyAccessToken = (req, res, next) => {
  try {
    const verified = jwt.verify(req.cookies.token, process.env.MY_SECRET);
    req.user = verified;
    next();
  } catch {
    res.redirect(403, "http://localhost:3000/");
  }
};

module.exports = { verifyAccessToken };
