const Cart = require("../models/Cart");

const createCart = async (req, res) => {
  try {
    const cart = new Cart({ products: [] });
    const newCart = await cart.save();
    res.json({ error: false, id_carrito: newCart._id });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    if (!req.body.productId)
      throw new Error("Falta indicar el id del producto en el campo productId");
    const cartId = req.params.id;
    const productId = req.body.productId;
    await Cart.updateOne({ _id: cartId }, { $push: { productos: productId } });
    res.json({
      error: false,
      message: "Producto agregado exitosamente al carrito"
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

module.exports = {
  createCart,
  addProductToCart
};
