const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Verifies the user token and renders the menu page for him
router.get("/", auth.verifyAccessToken, (req, res, next) => {
  // console.log(req.user);
  res.render("menu", { user: req.user.userIndex });
});

module.exports = router;
