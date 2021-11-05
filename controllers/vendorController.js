const path = require("path");
const moment = require("moment");
const Vendor = require("../models/Vendor");

const index = (req, res, next) => {
  Vendor.find()
    .then((response) => {
      res.json({
        dataVendor: response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Something Error",
      });
    });
};

const getDetail = async (req, res) => {
  const vendorID = req.params.id;

  try {
    const vendor = await Vendor.findById(vendorID);
    res.json({
      vendor,
    });
  } catch (error) {
    res.json({
      message: "Data Detail Error",
    });
  }
};

const addVendor = (req, res, next) => {
  let vendor = new Vendor({
    vendorname: req.body.vendorname,
    address: req.body.address,
    phone_number: req.body.phone_number,
    description: req.body.description,
  });

  vendor
    .save()
    .then((response) => {
      res.json({
        message: "Data Vendor Added",
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Data Vendor Error",
      });
    });
};

//update
const updateVendor = async (req, res) => {
  const vendorID = req.params.id;

  let updatedData = {
    vendorname: req.body.vendorname,
    address: req.body.address,
    phone_number: req.body.phone_number,
    description: req.body.description,
  };

  try {
    const vendor = await Vendor.findByIdAndUpdate(vendorID, {
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

//delete
const destroyVendor = (req, res, next) => {
  let vendorID = req.params.id;

  Vendor.findByIdAndRemove(vendorID)
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
  addVendor,
  updateVendor,
  destroyVendor,
};
