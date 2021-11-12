const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// const config = require("./config");
const apiRoutes = require("./routes/index");
const dotenv = require("dotenv");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api", apiRoutes);

dotenv.config();

//Database Connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => res.send("You are connected to Creave.id API"));

app.listen(PORT, () => console.log(`Server is Running on port ` + PORT));
