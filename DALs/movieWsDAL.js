const axios = require("axios");
const jFile = require("jsonfile");

// Return movies\shows list from api
const getMovies = () => {
  return axios.get("https://api.tvmaze.com/shows");
};
// Add movie to json file
const addMovie = (movie) => {
  jFile.writeFile(__dirname + "/../NewMovies.json", movie, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Movie Been Added");
    }
  });
};
// Get movies from json file
const getFromFile = () => {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + "/../NewMovies.json", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
module.exports = { getMovies, addMovie, getFromFile };
