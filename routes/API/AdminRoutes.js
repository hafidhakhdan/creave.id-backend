const express = require("express");
const uuid = require("uuid");
const multer = require("multer");
const path = require("path");
const adminRouter = express.Router();
const galleryController = require("../../controllers/galleryController");
const birthdayController = require("../../controllers/birthdayController");
const weddingController = require("../../controllers/weddingController");
const webinarController = require("../../controllers/webinarController");
const vendorController = require("../../controllers/vendorController");
const upload = require("../../middleware/uploadimage");

//Gallery Route
adminRouter.get("/gallery", galleryController.index);
adminRouter.get("/gallery/:id", galleryController.getDetail);
// adminRouter.post(
//   "/addGallery",
//   upload.fields([
//     {
//       name: "imageCover",
//       maxCount: 1,
//     },
//     {
//       name: "imageGallery",
//       maxCount: 10,
//     },
//   ]),
//   galleryController.store
// );
adminRouter.post(
  "/addGallery",
  upload.single("imageCover"),
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
adminRouter.post("/addBirthday", birthdayController.addBirthday);
adminRouter.post("/updateBirthday/:id", birthdayController.updateBirthday);
adminRouter.post(
  "/paymentBirthday/:id",
  upload.single("provePayment"),
  birthdayController.updatePayment
);
adminRouter.post("/statusBirthday/:id", birthdayController.updateStatus);
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
adminRouter.post(
  "/paymentWedding/:id",
  upload.single("provePayment"),
  weddingController.updatePayment
);
adminRouter.post("/statusWedding/:id", weddingController.updateStatus);
adminRouter.post("/deleteWedding/:id", weddingController.destroyWedding);

//Webinar Route
adminRouter.get("/webinar", webinarController.index);
adminRouter.get("/webinar/:id", webinarController.getDetail);
adminRouter.post(
  "/addWebinar",
  upload.single("provePayment"),
  webinarController.addWebinar
);
adminRouter.post(
  "/updateWebinar/:id",
  upload.single("provePayment"),
  webinarController.updateWebinar
);
adminRouter.post(
  "/paymentWebinar/:id",
  upload.single("provePayment"),
  webinarController.updatePayment
);
adminRouter.post("/statusWebinar/:id", webinarController.updateStatus);
adminRouter.post("/deleteWebinar/:id", webinarController.destroyWebinar);

//Vendor Route
adminRouter.get("/vendor", vendorController.index);
adminRouter.get("/vendor/:id", vendorController.getDetail);
adminRouter.post("/addVendor", vendorController.addVendor);
adminRouter.post("/updateVendor/:id", vendorController.updateVendor);
adminRouter.post("/deleteVendor/:id", vendorController.destroyVendor);

module.exports = adminRouter;
