const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  timestamp: { type: Number, default: Date.now() },
  nombre: {
    type: String,
    required: [true, "Es necesario ingresar un nombre para el producto"]
  },
  descripcion: {
    type: String,
    required: [true, "Es necesario ingresar una descripción para el producto"]
  },
  codigo: {
    type: String,
    required: [true, "Es necesario ingresar un código para el producto"]
  },
  foto_url: {
    type: String,
    required: [true, "Es necesario ingresar una url con la imagen del producto"]
  },
  precio: {
    type: Number,
    required: [true, "Es necesario ingresar un precio para el producto"]
  },
  stock: {
    type: Number,
    required: [
      true,
      "Es necesario ingresar una cantidad de stock para el producto"
    ]
  }
});

module.exports = mongoose.model("Product", ProductSchema);
