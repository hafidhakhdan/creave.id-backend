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
    imageGallery: {
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
