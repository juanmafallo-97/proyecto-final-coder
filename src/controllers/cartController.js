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

const getCartProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const cartProducts = await Cart.findOne({ _id: id }).populate("productos");
    res.json({ error: false, data: cartProducts });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    await Cart.deleteOne({ _id: id });
    res.json({ error: false, message: "Carrito eliminado exitosamente" });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const deleteCartProduct = async (req, res) => {
  try {
    const cartId = req.params.id;
    const productId = req.params.id_prod;
    await Cart.findByIdAndUpdate(cartId, {
      $pull: { productos: productId }
    });
    res.json({
      error: false,
      message: "Producto eliminado del carrito exitosamente"
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

module.exports = {
  createCart,
  addProductToCart,
  getCartProducts,
  deleteCart,
  deleteCartProduct
};
