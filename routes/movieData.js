const express = require("express");
const router = express.Router();
const moviesBL = require("../models/moviesBL");
const auth = require("../middleware/auth");

router.get("/*", auth.verifyAccessToken, async (req, res, next) => {
  let movie = await moviesBL.searchMovies(req.query);
  //   console.log(movie);
  res.render("movieData", { movie });
});

// router.post("/*", auth.verifyAccessToken, async (req, res, next) => {
//   console.log(req.query);
//   let correctedName = req.query.name.replace(", :", "&");

//   let movie = await moviesBL.getMovies(req.query);
//   console.log(movie);
//   res.render("movieData", movie);
// });

module.exports = router;
