const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  cast: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    trim: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  availableOn: [
    {
      type: String,
    },
  ],
  posterUrl: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
