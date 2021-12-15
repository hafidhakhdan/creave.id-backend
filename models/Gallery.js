const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
    },
    imageCover: {
      filename: {
        type: String,
        default: "Test",
      },
      url: {
        type: String,
        default: "Test",
      },
    },
    imageGallery1: {
      filename: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    imageGallery2: {
      filename: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    imageGallery3: {
      filename: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    imageGallery4: {
      filename: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    imageGallery5: {
      filename: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
