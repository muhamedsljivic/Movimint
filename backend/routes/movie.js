const express = require("express");

const router = express.Router();

const {
  getAllMovies,
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movie");

router.route("/").get(getAllMovies).post(createMovie);

router.route("/:id").get(getMovie).delete(deleteMovie).patch(updateMovie);

module.exports = router;
