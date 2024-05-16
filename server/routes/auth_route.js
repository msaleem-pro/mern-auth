const express = require("express");
const authRoute = express.Router();
const {
  signUp,
  signIn,
  googleAuth,
} = require("../controllers/auth_controller");

authRoute.post("/sign-in", signIn);
authRoute.post("/sign-up", signUp);
authRoute.post("/google-auth", googleAuth);

module.exports = authRoute;
