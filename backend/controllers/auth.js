const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );

  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password!");
  }

  const user = await User.authenticate(email, password);

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  res.status(StatusCodes.OK).json({ msg: "User logged in", token });
};

const getUserType = async (req, res) => {
  const user = await User.findOne({
    email: req.query.email,
  });
  if (!user) {
    throw new NotFoundError(`No user with email ${movieId}`);
  }

  const type = user.type;
  res.status(StatusCodes.OK).json({ type });
};

// const checkEmailExistsFn = async (email) => {
//   const user = await User.findOne({ email });
//   return !!user;
// };

const emailExists = async (req, res) => {
  const { email } = req.body;
  const findEmail = await User.findOne({ email });

  if (!findEmail) {
    res.status(StatusCodes.OK).json({ exists: false });
    return;
  }

  res.status(StatusCodes.BAD_REQUEST).json({ exists: true });
};

module.exports = {
  getUserType,
  login,
  register,
  emailExists,
};
