const express = require("express");
const router = express.Router();
const moviesBL = require("../models/moviesBL");
const auth = require("../middleware/auth");

// Renders createNewMovie page
router.get("/", auth.verifyAccessToken, (req, res, next) => {
  res.render("createNewMovie", {});
});
// Adds new movie
router.post("/", async (req, res, next) => {
  // console.log(req.body);
  await moviesBL.addMovie(req.body);
  res.redirect("/menu");
});

module.exports = router;