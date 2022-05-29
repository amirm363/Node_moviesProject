const express = require("express");
const router = express.Router();
const { verifyAccessToken, updateData } = require("../middleware/auth");
const sessionBL = require("../models/sessionBL");

// Verifies the user token and renders the menu page for him
router.get("/", [verifyAccessToken, updateData], async (req, res, next) => {
  data = await sessionBL.getData();
  console.log(req.session.authenticated);
  res.render("menu", { user: req.user.userIndex });
});

module.exports = router;
