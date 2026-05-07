const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoutes = require("./routes/TodoRouters");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api", todoRoutes);

// DB CONNECTION
mongoose
  .connect("mongodb://abdullahrifak522_db_user:WTcYq5Q7LMiSP8X1@ac-umnbdeo-shard-00-00.4yitpgn.mongodb.net:27017,ac-umnbdeo-shard-00-01.4yitpgn.mongodb.net:27017,ac-umnbdeo-shard-00-02.4yitpgn.mongodb.net:27017/?ssl=true&replicaSet=atlas-h8ot1e-shard-0&authSource=admin&appName=Cluster0")//mongodb+srv://abdullahrifak522_db_user:WTcYq5Q7LMiSP8X1@cluster0.4yitpgn.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});