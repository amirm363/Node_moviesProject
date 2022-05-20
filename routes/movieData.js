const express = require("express");
const router = express.Router();
const moviesBL = require("../models/moviesBL");
const auth = require("../middleware/auth");

router.get("/:data", auth.verifyAccessToken, async (req, res, next) => {
  //   console.log(req.params.data.split("|"));
  data = req.params.data.split("|")[1];
  let movie =
    req.params.data.split("|")[0] == "name"
      ? await moviesBL.searchMovies({
          name: data,
          genres: "blank",
          languages: "blank",
        })
      : await moviesBL.searchMovies({
          name: "",
          genres: data,
          languages: "blank",
        });

  console.log(movie);
  res.render("movieData", { movie });
});

// router.post("/*", auth.verifyAccessToken, async (req, res, next) => {
//   console.log(req.params.name);
//   let correctedName = req.query.name.replace("%2", " ");

//   let movie = await moviesBL.getMovies(req.query);
//   console.log(movie);
//   res.render("movieData", movie);
// });

module.exports = router;
