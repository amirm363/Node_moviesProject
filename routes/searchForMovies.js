const express = require("express");
const router = express.Router();
const moviesBL = require("../models/moviesBL");
const auth = require("../middleware/auth");

// Renders searchForMovies page
router.get("/", auth.verifyAccessToken, (req, res, next) => {
  res.render("searchForMovies", {});
});
// Searches for movies in the db+api
router.post("/", async (req, res, next) => {
  console.log(req.body);
  await moviesBL.searchMovies();
  // await moviesBL.addMovie(req.body);
  res.redirect("/menu");
});

module.exports = router;
