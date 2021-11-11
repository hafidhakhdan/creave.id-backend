const Birthday = require("../models/Birthday");
const path = require("path");
require("dotenv").config({ path: "./.env" });
const { cloudinary } = require("../config/cloudinary.js");
const dotenv = require("dotenv");
dotenv.config();

const index = (req, res, next) => {
  Birthday.find()
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
  const birthdayID = req.params.id;

  try {
    const birthday = await Birthday.findById(birthdayID);
    res.json({
      birthday,
    });
  } catch (error) {
    res.json({
      message: "Data Detail Error",
    });
  }
};

const addBirthday = (req, res, next) => {
  let birthday = new Birthday({
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
  });

  if (req.file) {
    birthday.provePayment = req.file.path;
  }

  birthday
    .save()
    .then((response) => {
      res.json({
        message: "Data Birthday Added",
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Data Birthday Error",
      });
    });
};

//update
const updateBirthday = async (req, res) => {
  const birthdayID = req.params.id;

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
    const birthday = await Birthday.findByIdAndUpdate(birthdayID, {
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
  const birthdayID = req.params.id;

  let updatedData = {
    status: req.body.status,
  };

  try {
    const birthday = await Birthday.findByIdAndUpdate(birthdayID, {
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
  const birthdayID = req.params.id;

  let updatedData = {};

  if (req.file) {
    updatedData.provePayment = req.file.path;
  }

  try {
    const birthday = await Birthday.findById(birthdayID);

    if (birthday.status === "On Payment") {
      const statusPayment = await Birthday.findByIdAndUpdate(birthdayID, {
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
const destroyBirthday = (req, res, next) => {
  let birthdayID = req.params.id;

  Birthday.findByIdAndRemove(birthdayID)
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
  addBirthday,
  updateBirthday,
  updateStatus,
  destroyBirthday,
  updatePayment,
};
