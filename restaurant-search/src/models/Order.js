const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    orderedAt: { type: Date, default: Date.now },
    quantity: { type: Number, default: 1 },
    priceAtOrder: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
