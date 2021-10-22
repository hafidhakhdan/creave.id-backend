const express = require("express");
const apiRouter = express.Router();
const userRoutes = require("./API/UserRoutes");
const adminRoutes = require("./API/AdminRoutes");

apiRouter.use("/user", userRoutes);
// apiRouter.use("/admin", adminRoutes);

module.exports = apiRouter;
