require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/restaurant_search";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use("/api", routes);
app.get("/", (req, res) => res.send("Restaurant search API is up"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
