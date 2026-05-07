const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const todoRoutes = require("./routes/TodoRouters");

const app = express();

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", todoRoutes);

if (!mongoUri) {
  console.error("Missing MONGODB_URI environment variable.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});