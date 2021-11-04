const express = require("express");
const uuid = require("uuid");
const multer = require("multer");
const path = require("path");
const adminRouter = express.Router();
const galleryController = require("../../controllers/galleryController");
const upload = require("../../middleware/uploadimage");

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

module.exports = adminRouter;
