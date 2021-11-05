const express = require("express");
const uuid = require("uuid");
const multer = require("multer");
const path = require("path");
const adminRouter = express.Router();
const galleryController = require("../../controllers/galleryController");
const birthdayController = require("../../controllers/birthdayController");
const weddingController = require("../../controllers/weddingController");
const webinarController = require("../../controllers/webinarController");
const upload = require("../../middleware/uploadimage");

//Gallery Route
adminRouter.get("/gallery", galleryController.index);
adminRouter.get("/gallery/:id", galleryController.getDetail);
adminRouter.post(
  "/addGallery",
  upload.fields([
    {
      name: "imageCover",
      maxCount: 1,
    },
    {
      name: "imageGallery",
      maxCount: 10,
    },
  ]),
  galleryController.store
);
adminRouter.post(
  "/updateGallery/:id",
  upload.fields([
    {
      name: "imageCover",
      maxCount: 1,
    },
    {
      name: "imageGallery",
      maxCount: 10,
    },
  ]),
  galleryController.update
);
adminRouter.post("/deleteGallery/:id", galleryController.destroy);

//Birthday Route
adminRouter.get("/birthday", birthdayController.index);
adminRouter.get("/birthday/:id", birthdayController.getDetail);
adminRouter.post(
  "/addBirthday",
  upload.single("provePayment"),
  birthdayController.addBirthday
);
adminRouter.post(
  "/updateBirthday/:id",
  upload.single("provePayment"),
  birthdayController.updateBirthday
);
adminRouter.post("/deleteBirthday/:id", birthdayController.destroyBirthday);

//Wedding Route
adminRouter.get("/wedding", weddingController.index);
adminRouter.get("/wedding/:id", weddingController.getDetail);
adminRouter.post(
  "/addWedding",
  upload.single("provePayment"),
  weddingController.addWedding
);
adminRouter.post(
  "/updateWedding/:id",
  upload.single("provePayment"),
  weddingController.updateWedding
);
adminRouter.post("/deleteWedding/:id", weddingController.destroyWedding);

module.exports = adminRouter;
