// require("dotenv").config({ path: "./.env" });
// const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Birthday = require("../models/Birthday");
const Webinar = require("../models/Webinar");
const Wedding = require("../models/Wedding");
var CryptoJS = require("crypto-js");

exports.register = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    const cekemail = await User.findOne({ email: req.body.email });
    if (!cekemail) {
      let newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString(),
        username: req.body.username,
        isAdmin: req.body.isAdmin,
      });

      try {
        const savedUser = await newUser.save();
        // const user = await User.findOne({ username: newUser.username });

        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(500).json({
        message: "Email has been registered",
      });
    }
  } else {
    res.status(400).json({ message: "Username already exists" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Data Tidak Ditemukan");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Password Salah");

    const accessToken = jwt.sign(
      { user: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOrderBirthday = async (req, res) => {
  try {
    const user = await User.findOne({ fullname: req.body.fullname });

    !user && res.status(401).json("Data Tidak Ditemukan");

    const order = await Birthday.find({ fullname: user.fullname });
    !order && res.status(401).json("Tidak ada pesanan");
    res.json({
      order,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOrderWedding = async (req, res) => {
  try {
    const user = await User.findOne({ fullname: req.body.fullname });

    !user && res.status(401).json("Data Tidak Ditemukan");

    const order = await Wedding.find({ fullname: user.fullname });
    !order && res.status(401).json("Tidak ada pesanan");
    res.json({
      order,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOrderWebinar = async (req, res) => {
  try {
    const user = await User.findOne({ fullname: req.body.fullname });

    !user && res.status(401).json("Data Tidak Ditemukan");

    const order = await Webinar.find({ fullname: user.fullname });
    !order && res.status(401).json("Tidak ada pesanan");
    res.json({
      order,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
