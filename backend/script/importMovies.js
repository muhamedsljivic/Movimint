const mongoose = require("mongoose");
const Movie = require("../models/Movie"); // Update path as needed
const moviesData = require("./moviesData.json"); // Path to your JSON file

mongoose
  .connect(
    "mongodb+srv://smuhamed620:02oWzXD28dwv9sAS@cluster0.j74ovqy.mongodb.net/movimint",
    {}
  )
  .then(async () => {
    console.log("Connected to MongoDB");

    for (const movieData of moviesData) {
      const exists = await Movie.findOne({
        title: movieData.title,
        releaseDate: movieData.releaseDate,
      }).exec();
      if (!exists) {
        await Movie.create(movieData);
        console.log(`Imported movie: ${movieData.title}`);
      } else {
        console.log(`Movie already exists: ${movieData.title}`);
      }
    }

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    mongoose.connection.close();
  });
