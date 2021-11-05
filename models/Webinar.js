const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    designPublication: {
      type: String,
    },
    certificate: {
      type: String,
    },
    mc: {
      type: Number,
    },
    zoomPackage: {
      type: String,
    },
    streaming: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    fullname: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
    provePayment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Webinar = mongoose.model("Webinar", webinarSchema);
module.exports = Webinar;
