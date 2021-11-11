const mongoose = require("mongoose");

const birthdaySchema = new mongoose.Schema(
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
      type: String,
    },
  },
  { timestamps: true }
);

const Birthday = mongoose.model("Birthday", birthdaySchema);
module.exports = Birthday;
