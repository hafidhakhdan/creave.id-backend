// require("dotenv").config({ path: "./.env" });
// const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
var CryptoJS = require("crypto-js");

exports.register = async (req, res) => {
  let newUser = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    username: req.body.username,
  });

  try {
    const savedUser = await newUser.save();
    const user = await User.findOne({ username: newUser.username });

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
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
