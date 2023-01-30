"use strict";

// Bring in Express code
const express = require("express");

const app = express();
const port = 3000;

app.use(express.json()); // This line is necessary for Express to be able to parse JSON in request body's

const favoriteMovieList = [
  {
    title: "Star Wars",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date(),
  },
  {
    title: "The Avengers",
    starRating: 4,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date(),
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/*************GET ALL MOVIES***************/
app.get("/all-movies", (req, res) => {
  res.json({
    success: true,
    favoriteMovieList: favoriteMovieList,
  });
});

/*************GET ALL MOVIES BELOW RATING***************/
app.get("/all-movies/:ratingNum", (req, res) => {
  let rating = req.params.ratingNum;

  let filteredList = favoriteMovieList.filter((rate) => {
    return rate.starRating <= rating;
  });

  res.json({
    success: true,
    favoriteMovieList: filteredList,
  });
});

/*************GET SINGLE MOVIE************/
app.get("/single-movie/:titleToFind", (req, res) => {
  console.log(req.params);

  let foundMovie = favoriteMovieList.find((movie) => {
    return movie.title === req.params.titleToFind;
  });

  res.json({
    success: true,
    foundMovie: foundMovie,
  });
});

/*************POST NEW MOVIE**************/
app.post("/new-movie", (req, res) => {
  let newMovie = {};

  if (req.body.title === undefined || typeof req.body.title !== "string")
    return res.json({
      sucess: false,
      message: "movie title is required and must be a string",
    });

  if (
    req.body.starRating === undefined ||
    typeof req.body.starRating !== "number" ||
    req.body.starRating > 5
  )
    return res.json({
      sucess: false,
      message: "starRating is required and must be a number",
    });

  if (
    req.body.isRecommended === undefined ||
    typeof req.body.isRecommended !== "boolean"
  )
    return res.json({
      sucess: false,
      message:
        "movie recomendation is required and must be a boolean (true / false)",
    });

  newMovie.title = req.body.title;
  newMovie.starRating = req.body.starRating;
  newMovie.isRecommended = req.body.isRecommended;
  newMovie.createdAt = new Date();
  newMovie.lastmodified = new Date();

  favoriteMovieList.push(newMovie);

  res.json({
    sucess: true,
  });
});

/*************ADD A NEW MOVIE************/
app.put("/update-movie/:movieToUpdate", (req, res) => {
  let titleToUpdate = req.params.movieToUpdate;

  let originalMovie = favoriteMovieList.find((movie) => {
    return movie.title === titleToUpdate;
  });

  let originalMovieIndex = favoriteMovieList.findIndex((movie) => {
    return movie.title === titleToUpdate;
  });

  if (!originalMovie)
    return res.json({ sucess: false, message: "could not find movie" });

  let updatedMovie = {};

  req.body.title !== undefined
    ? (updatedMovie.title = req.body.title)
    : (updatedMovie.title = originalMovie.title);

  req.body.starRating !== undefined
    ? (updatedMovie.starRating = req.body.starRating)
    : (updatedMovie.starRating = originalMovie.starRating);

  req.body.isRecommended !== undefined
    ? (updatedMovie.isRecommended = req.body.isRecommended)
    : (updatedMovie.isRecommended = originalMovie.isRecommended);

  updatedMovie.createdAt = originalMovie.createdAt;
  updatedMovie.lastModified = new Date();

  favoriteMovieList[originalMovieIndex] = updatedMovie;

  res.json({
    success: true,
  });
});

/*************DELETE A MOVIE**************/
app.delete("/delete-movie/:movieToDelete", (req, res) => {
  let titleToDelete = req.params.movieToDelete;

  let deleteMovieIndex = favoriteMovieList.findIndex((movie) => {
    return movie.title === titleToDelete;
  });

  favoriteMovieList.splice(deleteMovieIndex, 1);

  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
