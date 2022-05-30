const express = require("express");
const router = express.Router();
const moviesBL = require("../models/moviesBL");
const { verifyAccessToken, updateTransactions } = require("../middleware/auth");

// Renders searchForMovies page
router.get("/", verifyAccessToken, (req, res, next) => {
  res.render("searchForMovies", {});
});
// Searches for movies in the db+api
router.post("/", updateTransactions, async (req, res, next) => {
  // console.log(req.body);
  if (
    req.body.name == "" &&
    req.body.languages == "blank" &&
    req.body.genres == "blank"
  ) {
    return res.redirect("/menu");
  }
  const movies = await moviesBL.searchMovies(req.body);
  movies.length == 0
    ? res.send("Sorry you'r search results came back empty")
    : res.render("searchResultsPage", { movies });
});

module.exports = router;
