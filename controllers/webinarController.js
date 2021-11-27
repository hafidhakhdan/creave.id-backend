const path = require("path");
const moment = require("moment");
const Webinar = require("../models/Webinar");
const { cloudinary } = require("../config/cloudinary.js");
const dotenv = require("dotenv");
const upload = require("../middleware/uploadimage.js");
dotenv.config();

const index = (req, res, next) => {
  Webinar.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Something Error",
      });
    });
};

const getDetail = async (req, res) => {
  const webinarID = req.params.id;

  try {
    const webinar = await Webinar.findById(webinarID);
    res.json({
      webinar,
    });
  } catch (error) {
    res.json({
      message: "Data Detail Error",
    });
  }
};

const addWebinar = (req, res, next) => {
  let webinar = new Webinar({
    theme: req.body.theme,
    date: req.body.date,
    streaming: req.body.streaming,
    zoomPackage: req.body.zoomPackage,
    mc: req.body.mc,
    certificate: req.body.certificate,
    designPublication: req.body.designPublication,
    totalPrice: req.body.totalPrice,
    fullname: req.body.fullname,
    phone_number: req.body.phone_number,
    status: req.body.status,
  });

  if (req.file) {
    webinar.provePayment = req.file.path;
  }

  webinar
    .save()
    .then((response) => {
      res.json({
        message: "Data Webinar Added",
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Data Webinar Error",
      });
    });
};

//update
const updateWebinar = async (req, res) => {
  const webinarID = req.params.id;

  let updatedData = {
    theme: req.body.theme,

    date: req.body.date,
    streaming: req.body.streaming,
    zoomPackage: req.body.zoomPackage,
    mc: req.body.mc,
    certificate: req.body.certificate,
    designPublication: req.body.designPublication,

    totalPrice: req.body.totalPrice,
    fullname: req.body.fullname,
    phone_number: req.body.phone_number,
    status: req.body.status,
  };

  if (req.file) {
    updated.provePayment = req.file.path;
  }

  try {
    const webinar = await Webinar.findByIdAndUpdate(webinarID, {
      $set: updatedData,
    });

    res.json({
      message: "Update Data Success",
      updatedData,
    });
  } catch (error) {
    res.json({
      message: "Error Update",
    });
  }
};

//update status
const updateStatus = async (req, res) => {
  const webinarID = req.params.id;

  let updatedData = {
    status: req.body.status,
  };

  try {
    const webinar = await Webinar.findByIdAndUpdate(webinarID, {
      $set: updatedData,
    });

    res.json({
      message: "Update Status Data Success",
      updatedData,
    });
  } catch (error) {
    res.json({
      message: "Error Update Status",
    });
  }
};

//update payment
const updatePayment = async (req, res) => {
  const webinarID = req.params.id;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const webinar = await Webinar.findById(webinarID);

    let updatedData = {
      provePayment: {
        filename: req.file.originalname,
        url: result.secure_url,
      },
    };

    if (webinar.status === "waiting payment") {
      const statusPayment = await Webinar.findByIdAndUpdate(webinarID, {
        $set: updatedData,
      });

      res.json({
        message: "Upload Pembayaran berhasil",
      });
    } else {
      res.json({
        message: "Pembayaran tidak bisa dilakukan",
      });
    }
  } catch (error) {
    res.json({
      message: "Data Payment Error",
    });
  }
};

//delete
const destroyWebinar = (req, res, next) => {
  let webinarID = req.params.id;

  Webinar.findByIdAndRemove(webinarID)
    .then(() => {
      res.json({
        message: "Deleted Success",
      });
    })
    .catch((error) => {
      res.json({
        message: "eror delete",
      });
    });
};

module.exports = {
  index,
  getDetail,
  addWebinar,
  updateWebinar,
  destroyWebinar,
  updateStatus,
  updatePayment,
};
