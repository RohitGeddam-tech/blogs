
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";
import blogRoutes from "./routes/blogs.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/category", categoryRoutes);

// mongoose.connect()
app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 5172;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => app.listen(PORT, () => console.log("running on localhost:5172")))
  .catch((error) => console.log("error: ", error.message));

// app.listen(3000, () => console.log("port 3000"));
