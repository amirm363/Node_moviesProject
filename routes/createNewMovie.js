const express = require("express");
const router = express.Router();
const moviesBL = require("../models/moviesBL");
const { verifyAccessToken, updateTransactions } = require("../middleware/auth");

// Renders createNewMovie page
router.get("/", verifyAccessToken, (req, res, next) => {
  res.render("createNewMovie", {});
});
// Adds new movie
router.post("/", updateTransactions, async (req, res, next) => {
  await moviesBL.addMovie(req.body);
  res.redirect("/menu");
});

module.exports = router;
