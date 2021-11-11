const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendorname: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
    phone_number: {
      type: String,
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
