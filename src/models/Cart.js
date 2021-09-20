const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  timestamp: Number,
  productos: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

module.exports = mongoose.model("Cart", CartSchema);
