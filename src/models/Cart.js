const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  timestamp: { type: Number, default: Date.now() },
  productos: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

module.exports = mongoose.model("Cart", CartSchema);
