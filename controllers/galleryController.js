const Gallery = require("../models/Gallery");
const path = require("path");
const { cloudinary } = require("../config/cloudinary.js");
const dotenv = require("dotenv");
const upload = require("../middleware/uploadimage.js");
const fs = require("fs");
dotenv.config();

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

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      console.log(res.secure_url);
      resolve({
        res: res.secure_url,
      });
    });
  });
};

const store = async (req, res) => {
  // const files = req.files;

  // if (files) {
  //   let path = "";
  //   let pathCover = "";
  //   files["imageGallery"].forEach(async function (files) {
  //     path = path + files.path + ",";
  //   });
  //   pathGallery = path.substring(0, path.lastIndexOf(","));
  //   pathCover = files.imageCover[0].path;
  // }

  // res.json({
  //   pathCover,
  //   pathGallery,
  // });
  const result = await cloudinary.uploader.upload(req.file.path);
  try {
    let gallery = new Gallery({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,

      imageCover: {
        filename: req.file.originalname,
        url: result.secure_url,
      },
    });
    const saveGallery = await gallery.save();
    res.json({
      message: "Data Saved",
      saveGallery,
    });
    // gallery
    //   .save()
    //   .then((response) => {
    //     res.json({
    //       message: "Data Added",
    //       response,
    //     });
    //   })
    //   .catch((error) => {
    //     res.json({
    //       message: "Data  Error",
    //     });
    //   });
    // let urls = [];
    // for (const file of files) {
    //   const { path } = file;
    //   const newPath = await cloudinaryImageUploadMethod(path);
    //   urls.push(newPath);
    // }
    // const product = {
    //   productImages: urls.map((url) => url.res),
    // };
    // res.json({
    //   product,
    // });
    // let multiple = async (path) => await cloudinary.uploader.upload(path);
    // const result = await cloudinary.uploader.upload(req.files.path);
    // let filePaths = req.files.imageGallery;
    // for (const file of files) {
    //   const { path } = file;
    //   console.log("path", file);
    //   const newPath = await multiple(path);
    //   urls.push(newPath);
    //   fs.unlinkSync(path);
    // }
    // let data = {
    //   title: req.body.title,
    //   description: req.body.description,
    //   date: req.body.date,
    //   imageGallery: {
    //     url : req.files
    //   }
    // }
    // res.json({
    //   multiple,
    // });
    // if (urls) {
    //   let body = req.body;
    //   let bodyw = _.extend(body, { imageGallery: urls });
    //   let data = {
    //     title: body.title,
    //     imageCover: {
    //       url: urls[0].url,
    //     },
    //     imageGallery: {
    //       url: urls,
    //     },
    //   };
    //   res.json({
    //     data,
    //   });
    // let new_user = new Gallery(data);
    // await new_user
    //   .save()
    //   .then((saved) => {
    //     return res.json(saved);
    //   })
    //   .catch((error) => {
    //     return res.json(error);
    //   });
    // }
    // if (!urls) {
    //   return res.status(400).json({ message: "Tidak ada URLs" });
    // }
  } catch (error) {
    res.json({
      message: error,
    });
  }

  // let gallery = new Gallery({
  //   title: req.body.title,
  //   description: req.body.description,
  //   date: req.body.date,
  // });

  // if (req.files) {
  //   let path = "";

  //   req.files["imageGallery"].forEach(async function (files) {
  //     path = path + files.path + ",";
  //   });
  //   pathGallery = path.substring(0, path.lastIndexOf(","));
  //   gallery.imageGallery = pathGallery;
  //   gallery.imageCover = req.files.imageCover[0].path;
  // }

  // gallery
  //   .save()
  //   .then((response) => {
  //     res.json({
  //       message: "Data Added",
  //       response,
  //     });
  //   })
  //   .catch((error) => {
  //     res.json({
  //       message: "Data Error",
  //     });
  //   });
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
