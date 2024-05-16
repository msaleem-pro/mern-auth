const express = require("express");
const userRoute = express.Router();
const { updateUser } = require("../controllers/user_controller");
userRoute.put("/update-user/:id", updateUser);

module.exports = userRoute;
