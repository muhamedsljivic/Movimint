const express = require("express");
const router = express.Router();

const {
  login,
  register,
  emailExists,
  getUserType,
} = require("../controllers/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/check-email").post(emailExists);
router.route("/type").get(getUserType);

module.exports = router;
