const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  timestamp: { type: Number, default: Date.now() },
  nombre: String,
  descripcion: String,
  codigo: String,
  foto_url: String,
  precio: Number,
  stock: Number
});

module.exports = mongoose.model("Product", ProductSchema);
