const express = require("express");
const router = express.Router();
const moviesBL = require("../models/moviesBL");
const { verifyAccessToken } = require("../middleware/auth");

router.get("/:data", verifyAccessToken, async (req, res, next) => {
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

  res.render("movieData", { movie });
});

module.exports = router;
