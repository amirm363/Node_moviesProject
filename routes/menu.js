const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/auth");
const sessionBL = require("../models/sessionBL");

// Verifies the user token and renders the menu page for him
router.get("/", verifyAccessToken, async (req, res, next) => {
  data = await sessionBL.getData();
  res.render("menu", { user: req.user.userIndex });
});

module.exports = router;
