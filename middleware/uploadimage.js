const path = require("path");
const multer = require("multer");
const { cloudinary } = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const CloudinaryStorages = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      let subFolder = "";
      if (file.fieldname === "imageCover") {
        subFolder = "assets/venue/venue_photos";
      } else if (file.fieldname === "imageGallery") {
        subFolder = "assets/venue/documents";
      } else if (file.fieldname === "provePayment") {
        return subFolder;
      }
    },
  },
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "imageCover") {
      cb(null, "uploads/cover/");
    } else if (file.fieldname === "imageGallery") {
      cb(null, "uploads/gallery/");
    } else if (file.fieldname === "provePayment") {
      cb(null, "uploads/payment/");
    }
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + Date.now() + ext);
  },
});

var upload = multer({
  storage: CloudinaryStorages,
  // fileFilter: function (req, file, callback) {
  //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
  //     callback(null, true);
  //   } else {
  //     console.log("only jpg & png");
  //     callback(null, false);
  //   }
  // },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
