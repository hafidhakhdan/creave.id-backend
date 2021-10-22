const express = require("express");
const uuid = require("uuid");
const multer = require("multer");
const path = require("path");
const userRouter = express.Router();
const userController = require("../../controllers/userController");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
// userRouter.post("/logout", userController.logout);

module.exports = userRouter;
