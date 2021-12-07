const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { sendNewOrderNotification } = require("../utils/nodemailer");
const { sendWappOrderNotice, sendSmsOrderNotice } = require("../utils/twilio");

const createCart = async (userId) => {
  try {
    const cart = new Cart({ user: userId });
    const newCart = await cart.save();
    return newCart._id;
  } catch (err) {
    throw new Error(err);
  }
};

const addProductToCart = async (cartId, productId) => {
  try {
    // Primero verificamos que el id del producto que se quiere agregar exista realmente en los productos
    const product = await Product.findById(productId);
    if (!product)
      throw new Error(`No existe ningún producto con el id ${productId}`);
    await Cart.updateOne({ _id: cartId }, { $push: { productos: productId } });
  } catch (err) {
    throw new Error(err);
  }
};

const getCartProducts = async (id) => {
  try {
    const cart = await Cart.findOne({ _id: id }).populate("productos");
    return cart.productos;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteCart = async (id) => {
  try {
    await Cart.deleteOne({ _id: id });
  } catch (err) {
    throw new Error(err);
  }
};

const deleteCartProduct = async (cartId, productId) => {
  try {
    const cart = await Cart.findOne({ _id: cartId }).populate("productos");
    if (!cart.productos.includes(productId))
      throw new Error(
        "El producto a eliminar no se encuentra en el carrito seleccionado"
      );
    await Cart.findByIdAndUpdate(cartId, {
      $pull: { productos: productId }
    });
  } catch (err) {
    throw new Error(err);
  }
};

const orderCart = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId).populate([
      { path: "productos" },
      { path: "user", model: "User", select: { _id: 0, password: 0 } }
    ]);
    console.log(cart);
    sendNewOrderNotification(cart);
    sendWappOrderNotice(cart);
    sendSmsOrderNotice(cart);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createCart,
  addProductToCart,
  getCartProducts,
  deleteCart,
  deleteCartProduct,
  orderCart
};
