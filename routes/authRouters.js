const express = require("express");
const router = express.Router();
const {
  getLogin,
  getRegister,
  postRegister,
  postLogin,
  getLogout
} = require("../controllers/authControllers");

// Get the login page
router.get("/login", getLogin);

// Get the register page
router.get("/register", getRegister);

// Send a post request to register a user
router.post("/register", postRegister);

// Login Handle
router.post("/login", postLogin);

// Logout handle
router.get("/logout", getLogout);

module.exports = router;
