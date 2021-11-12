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
      },
      url: {
        type: String,
      },
    },
    imageGallery: {
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

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
