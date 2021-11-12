const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    theme: {
      type: String,
    },
    guest: {
      type: Number,
    },
    foodType: {
      type: String,
    },
    foodTotal: {
      type: Number,
    },
    entertain: {
      type: String,
    },
    mc: {
      type: Number,
    },
    mua: {
      type: String,
    },
    wardrobe: {
      type: String,
    },
    documentation: {
      type: String,
    },
    souvenir: {
      type: String,
    },
    design: {
      type: String,
    },
    venue: {
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

const Wedding = mongoose.model("Wedding", weddingSchema);
module.exports = Wedding;
