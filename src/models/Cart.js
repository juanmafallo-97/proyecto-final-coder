const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
  timestamp: { type: Number, default: Date.now() },
  productos: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Cart", CartSchema);
