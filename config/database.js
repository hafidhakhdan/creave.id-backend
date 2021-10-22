const mongoose = require("mongoose");

module.exports = async (next) => {
  try {
    await mongoose.connect(
      `mongodb+srv://dbCreave:dbCreaveAdmin@cluster0.yetqf.mongodb.net/creave?retryWrites=true&w=majority`
    );
    console.log(`Database  is now connected!`);
    next();
  } catch (err) {
    console.log(err);
  }
};
