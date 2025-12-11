const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: String,
    address: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Restaurant", restaurantSchema);
