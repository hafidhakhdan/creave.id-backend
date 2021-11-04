const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    guest: {
      type: Number,
      required: true,
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

const Wedding = mongoose.model("Wedding", weddingSchema);
module.exports = Wedding;
