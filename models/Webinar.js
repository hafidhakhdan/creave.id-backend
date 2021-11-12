const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    theme: {
      type: String,
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
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
    provePayment: {
      filename: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Webinar = mongoose.model("Webinar", webinarSchema);
module.exports = Webinar;
