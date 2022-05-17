const res = require("express/lib/response");
const movieWsDAL = require("../DALs/movieWsDAL");

// Passes the getMovies function to the routes layer
const getMovies = async () => {
  return await movieWsDAL.getMovies();
};

// the Logic behind adding a new movie
const addMovie = async (movie) => {
  const movies = await movieWsDAL.getMovies();
  let idMovies = movies.data.at(-1).id;
  let movieList = await movieWsDAL.getFromFile();
  if (movie.name != "" && movie.lang != "" && movie.genre.length != 0) {
    if (movieList.movies.length == 0) {
      movieList.movies.push({
        Id: idMovies + 1,
        Name: movie.name,
        Language: movie.lang,
        Genres: movie.genre,
      });
      return movieWsDAL.addMovie(movieList);
    } else {
      movieList.movies.push({
        Id: movieList.movies.at(-1).Id + 1,
        Name: movie.name,
        Language: movie.lang,
        Genres: movie.genre,
      });
      return movieWsDAL.addMovie(movieList);
    }
  } else {
    console.log("All the fields must be filled");
  }
};

// Search movies function
const searchMovies = async (data) => {
  const wsMovies = await movieWsDAL.getMovies();
  const fileMovies = await movieWsDAL.getFromFile();

  console.log(fileMovies, wsMovies.data[0]);
};

module.exports = { getMovies, addMovie, searchMovies };
