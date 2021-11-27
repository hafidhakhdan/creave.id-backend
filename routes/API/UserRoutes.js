const express = require("express");
const uuid = require("uuid");
const multer = require("multer");
const path = require("path");
const userRouter = express.Router();
const userController = require("../../controllers/userController");

const galleryController = require("../../controllers/galleryController");
const birthdayController = require("../../controllers/birthdayController");
const weddingController = require("../../controllers/weddingController");
const webinarController = require("../../controllers/webinarController");
const upload = require("../../middleware/uploadimage");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
// userRouter.post("/logout", userController.logout);

//Birthday Route
userRouter.get("/birthday", birthdayController.index);
userRouter.get("/birthday/:id", birthdayController.getDetail);
userRouter.post(
  "/updateBirthday/:id",
  upload.single("provePayment"),
  birthdayController.updateBirthday
);

//Wedding Route
userRouter.get("/wedding", weddingController.index);
userRouter.get("/wedding/:id", weddingController.getDetail);
userRouter.post(
  "/updateWedding/:id",
  upload.single("provePayment"),
  weddingController.updateWedding
);

//Webinar Route
userRouter.get("/webinar", webinarController.index);
userRouter.get("/webinar/:id", webinarController.getDetail);
userRouter.post(
  "/updateWebinar/:id",
  upload.single("provePayment"),
  webinarController.updateWebinar
);

//Get Pesanan Birthday
userRouter.post("/birthday", userController.getOrderBirthday);

//Update payment birthday
userRouter.post(
  "/paymentBirthday/:id",
  upload.single("provePayment"),
  birthdayController.updatePayment
);

//Get Pesanan Wedding
userRouter.post("/wedding", userController.getOrderWedding);

//Update payment Wedding
userRouter.post(
  "/paymentWedding/:id",
  upload.single("provePayment"),
  weddingController.updatePayment
);

//Get Pesanan Webinar
userRouter.post("/webinar", userController.getOrderWebinar);

//Update payment webinar
userRouter.post(
  "/paymentWebinar/:id",
  upload.single("provePayment"),
  webinarController.updatePayment
);
module.exports = userRouter;
