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
        id: idMovies + 1,
        name: movie.name,
        language: movie.lang,
        genres: movie.genre,
      });
      return movieWsDAL.addMovie(movieList);
    } else {
      movieList.movies.push({
        id: movieList.movies.at(-1).id + 1,
        name: movie.name,
        language: movie.lang,
        genres: movie.genre,
      });
      return movieWsDAL.addMovie(movieList);
    }
  } else {
    console.log("All the fields must be filled");
  }
};

// Search movies function
const searchMovies = async (data) => {
  let wsMovies = await movieWsDAL.getMovies();
  let fileMovies = await movieWsDAL.getFromFile();
  let allMovies = wsMovies.data.concat(fileMovies.movies);
  let capAndUnCap = [];
  let dataFlags = {
    name: data.name != "" ? true : false,
    genre: data.genres != "blank" ? true : false,
    language: data.languages != "blank" ? true : false,
  };
  if (dataFlags.name) {
    capAndUnCap = [
      data.name.toLowerCase(),
      data.name.at(0).toUpperCase() + data.name.slice(1),
    ];
  }

  allMovies = !dataFlags.name ? allMovies : searchName(allMovies, data.name);

  allMovies = !dataFlags.genre
    ? allMovies
    : searchGenre(allMovies, data.genres);

  allMovies = !dataFlags.language
    ? allMovies
    : searchLang(allMovies, data.languages);
  console.log(allMovies);
  return allMovies;
};

// Function that searches by name
const searchName = (moviesArray, data) => {
  let moviesWsArr = moviesArray.filter((m) => {
    if (
      m.name.includes(data.toLowerCase()) ||
      m.name.includes(data.at(0).toUpperCase() + data.slice(1))
    ) {
      return m;
    }
  });
  //   console.log(moviesWsArr);
  return moviesWsArr;
};

// Function that searches by genre
const searchGenre = (moviesArray, data) => {
  let moviesWsArr = moviesArray.filter((m) => {
    if (m.genres.includes(data)) {
      return m;
    }
  });

  return moviesWsArr;
};
// Function that searches by languages
const searchLang = (moviesArray, data) => {
  let moviesWsArr = moviesArray.filter((m) => {
    if (m.language.includes(data)) {
      return m;
    }
  });

  return moviesWsArr;
};
module.exports = { getMovies, addMovie, searchMovies };
