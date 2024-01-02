const Movie = require("../models/Movie");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllMovies = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  const search = req.query.search || "";

  let query = {};
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const count = await Movie.countDocuments(query);

  const results = await Movie.find(query).limit(limit).skip(skip).exec();
  res.status(StatusCodes.OK).json({ results, count });
};

const createMovie = async (req, res) => {
  const newMovie = await Movie.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ newMovie });
};

const getMovie = async (req, res) => {
  const {
    params: { id: movieId },
  } = req;

  const movie = await Movie.findOne({
    _id: movieId,
  });

  if (!movie) {
    throw new NotFoundError(`No movie with id ${movieId}`);
  }

  res.status(StatusCodes.OK).json({ movie });
};

const updateMovie = async (req, res) => {
  const {
    body: {
      title,
      director,
      releaseDate,
      genres,
      rating,
      cast,
      description,
      runtime,
      language,
      availableOn,
      posterUrl,
    },
    params: { id: movieId },
  } = req;

  if (title && title.trim() === "") {
    throw new BadRequestError("Title field can not be empty");
  }

  if (director && director.trim() === "") {
    throw new BadRequestError("Director field can not be empty");
  }

  if (releaseDate && new Date(releaseDate) == "Invalid Date") {
    throw new BadRequestError("Invalid or missing release date");
  }
  if (genres && (!Array.isArray(genres) || genres.length === 0)) {
    throw new BadRequestError("Genres must be a non-empty array");
  }
  if (rating && (rating < 0 || rating > 10)) {
    throw new BadRequestError("Rating must be a number between 0 and 10");
  }
  if (cast && (!Array.isArray(cast) || cast.length === 0)) {
    throw new BadRequestError("Cast must be a non-empty array");
  }
  if (description && description.trim() === "") {
    throw new BadRequestError("Description field can not be empty");
  }
  if (runtime && runtime <= 0) {
    throw new BadRequestError("Runtime must be a positive number");
  }
  if (language && language.trim() === "") {
    throw new BadRequestError("Language field can not be empty");
  }
  if (availableOn && !Array.isArray(availableOn)) {
    throw new BadRequestError("AvailableOn must be an array");
  }
  if (posterUrl && typeof posterUrl !== "string") {
    throw new BadRequestError("Poster URL must be a string");
  }

  const movie = await Movie.findByIdAndUpdate({ _id: movieId }, req.body);
  if (!movie) {
    throw new NotFoundError(`No movie with id ${movieId}`);
  }

  res.status(StatusCodes.OK).json({ movie });
};

const deleteMovie = async (req, res) => {
  const {
    params: { id: movieId },
  } = req;

  const movie = await Movie.findByIdAndDelete({
    _id: movieId,
  });

  if (!movie) {
    throw new NotFoundError(`No movie with id ${movieId}`);
  }

  res.status(StatusCodes.OK).json({ movie });
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
};
