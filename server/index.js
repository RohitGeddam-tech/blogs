const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const MONGODB_URL = `mongodb+srv://Rohi:Gamer_13@cluster0.nistphz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect()
app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 5172;

mongoose
  .connect(MONGODB_URL)
  .then(() => app.listen(PORT, () => console.log("running on localhost:5172")))
  .catch((error) => console.log("error: ", error.message));

// app.listen(3000, () => console.log("port 3000"));
