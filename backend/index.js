require("dotenv").config();
require("express-async-errors");

const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const app = express();
const cors = require("cors");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRouter = require("./routes/main");
const movieRouter = require("./routes/movie");
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
const corsOptions = require("./config/corsOptions");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(helmet());
app.use(cors(corsOptions));
app.use(xss());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movies", authenticateUser, movieRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
