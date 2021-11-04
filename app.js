const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const config = require("./config");
const apiRoutes = require("./routes/index");
const dotenv = require("dotenv");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api", apiRoutes);

dotenv.config();
// const uriDB =
//   "mongodb+srv://dbCreave:dbCreaveAdmin@cluster0.yetqf.mongodb.net/creave?retryWrites=true&w=majority";

// mongoose.connect(uriDB, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on("error", (err) => {
//   console.log(err);
// });

// db.once("open", () => {
//   console.log("connect succes");
// });

//Database Connection

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb+srv://dbCreave:dbCreaveAdmin@cluster0.yetqf.mongodb.net/creave?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   //   perform actions on the collection object
//   client.close();
// });

const PORT = process.env.PORT || 5000;
// Database connection
// config.database(() => {
//   app.listen(PORT, () => {
//     console.log(`Listening on port:${PORT}`);
//   });
// });

app.get("/api", (req, res) => res.send("You are connected to Creave.id API"));

app.listen(PORT, () => console.log(`Server is Running on port ` + PORT));
