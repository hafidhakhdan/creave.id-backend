const Wedding = require("../models/Wedding");
const path = require("path");
const moment = require("moment");
const { cloudinary } = require("../config/cloudinary.js");
const dotenv = require("dotenv");
const upload = require("../middleware/uploadimage.js");
dotenv.config();

const index = (req, res, next) => {
  Wedding.find()
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
  const weddingID = req.params.id;

  try {
    const wedding = await Wedding.findById(weddingID);
    res.json({
      wedding,
    });
  } catch (error) {
    res.json({
      message: "Data Detail Error",
    });
  }
};

const addWedding = (req, res, next) => {
  let wedding = new Wedding({
    theme: req.body.theme,
    guest: req.body.guest,
    date: req.body.date,
    foodType: req.body.foodType,
    foodTotal: req.body.foodTotal,
    entertain: req.body.entertain,
    mc: req.body.mc,
    mua: req.body.mua,
    wardrobe: req.body.wardrobe,
    documentation: req.body.documentation,
    souvenir: req.body.souvenir,
    design: req.body.design,
    venue: req.body.venue,
    totalPrice: req.body.totalPrice,
    fullname: req.body.fullname,
    phone_number: req.body.phone_number,
  });

  wedding
    .save()
    .then((response) => {
      res.json({
        message: "Data Wedding Added",
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Data Wedding Error",
      });
    });
};

//update
const updateWedding = async (req, res) => {
  const weddingID = req.params.id;

  let updatedData = {
    theme: req.body.theme,
    guest: req.body.guest,
    date: req.body.date,
    foodType: req.body.foodType,
    foodTotal: req.body.foodTotal,
    entertain: req.body.entertain,
    mc: req.body.mc,
    mua: req.body.mua,
    wardrobe: req.body.wardrobe,
    documentation: req.body.documentation,
    souvenir: req.body.souvenir,
    design: req.body.design,
    venue: req.body.venue,
    totalPrice: req.body.totalPrice,
    fullname: req.body.fullname,
    phone_number: req.body.phone_number,
    status: req.body.status,
  };

  if (req.file) {
    updated.provePayment = req.file.path;
  }

  try {
    const wedding = await Wedding.findByIdAndUpdate(weddingID, {
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
  const weddingID = req.params.id;

  let updatedData = {
    status: req.body.status,
  };

  try {
    const wedding = await Wedding.findByIdAndUpdate(weddingID, {
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
  const weddingID = req.params.id;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const wedding = await Birthday.findById(weddingID);

    let updatedData = {
      provePayment: {
        filename: req.file.originalname,
        url: result.secure_url,
      },
    };

    if (wedding.status === "waiting payment") {
      const statusPayment = await Wedding.findByIdAndUpdate(weddingID, {
        $set: updatedData,
      });

      res.json({
        message: "Upload Pembayaran berhasil",
      });
    } else if (wedding.status === "Pending") {
      res.json({
        message: "Pembayaran belum bisa dilakukan",
      });
    } else {
      res.json({
        message: "Pembayaran tidak dapat dilakukan dilakukan",
      });
    }
  } catch (error) {
    res.json({
      message: "Data Payment Error",
    });
  }
};

//delete
const destroyWedding = (req, res, next) => {
  let weddingID = req.params.id;

  Wedding.findByIdAndRemove(weddingID)
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
  addWedding,
  updateWedding,
  destroyWedding,
  updateStatus,
  updatePayment,
};
