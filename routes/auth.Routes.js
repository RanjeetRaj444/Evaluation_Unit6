const express = require("express");

const authRouter = express.Router();

const userController = require("../controllers/userController");

authRouter.post("/logout", userController.logout);

module.exports = { authRouter };
