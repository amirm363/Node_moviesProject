var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

var loginRouter = require("./routes/login");
var menuRouter = require("./routes/menu");
var createUserRouter = require("./routes/createUser");
var createMovieRouter = require("./routes/createNewMovie");
var searchMoviesRouter = require("./routes/searchForMovies");
var movieDataRouter = require("./routes/movieData");
var usersManagmentRouter = require("./routes/usersManagment");
var userDataRouter = require("./routes/userData");

var app = express();
app.use(cors());
require("dotenv").config();
require("./config/storeConnect");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use("/", loginRouter);
app.use("/menu", menuRouter);
app.use("/createUser", createUserRouter);
app.use("/createNewMovie", createMovieRouter);
app.use("/searchForMovies", searchMoviesRouter);
app.use("/searchForMovies/movieData", movieDataRouter);
app.use("/usersManagment", usersManagmentRouter);
app.use("/userData", userDataRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
