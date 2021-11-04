const Gallery = require("../models/Gallery");
const path = require("path");

const index = (req, res, next) => {
  Gallery.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Something Error",
      });
    });
};

// const getDetail = (req, res, next) => {
//   let galleryID = req.params.id;
//   Gallery.findById(galleryID)
//     .then((response) => {
//       res.json({
//         response,
//       });
//     })
//     .catch((error) => {
//       res.json({
//         message: "Data Detail Error",
//       });
//     });
// };

const getDetail = async (req, res) => {
  const galleryID = req.params.id;

  try {
    const gallery = await Gallery.findById(galleryID);
    res.json({
      gallery,
    });
  } catch (error) {
    res.json({
      message: "Data Detail Error",
    });
  }
};

const store = (req, res, next) => {
  let gallery = new Gallery({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
  });

  if (req.files) {
    let path = "";

    req.files["imageGallery"].forEach(async function (files) {
      path = path + files.path + ",";
    });
    pathGallery = path.substring(0, path.lastIndexOf(","));
    gallery.imageGallery = pathGallery;
    gallery.imageCover = req.files.imageCover[0].path;
  }

  gallery
    .save()
    .then((response) => {
      res.json({
        message: "Data Added",
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Data Error",
      });
    });
};

//update
const update = async (req, res) => {
  const galleryID = req.params.id;

  let updatedData = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
  };

  if (req.files) {
    let path = "";

    req.files["imageGallery"].forEach(async function (files) {
      path = path + files.path + ",";
    });
    pathGallery = path.substring(0, path.lastIndexOf(","));
    updatedData.imageGallery = pathGallery;
    updatedData.imageCover = req.files.imageCover[0].path;
  }

  try {
    const gallery = await Gallery.findByIdAndUpdate(galleryID, {
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
const destroy = (req, res, next) => {
  let galleryID = req.params.id;

  Gallery.findByIdAndRemove(galleryID)
    .then(() => {
      res.json({
        message: "Deleted Succes",
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
  store,
  update,
  destroy,
};
