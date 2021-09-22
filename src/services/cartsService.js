const Cart = require("../models/Cart");

const createCart = async () => {
  try {
    const cart = new Cart();
    const newCart = await cart.save();
    return newCart._id;
  } catch (err) {
    throw new Error(err);
  }
};

const addProductToCart = async (cartId, productId) => {
  try {
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
    await Cart.findByIdAndUpdate(cartId, {
      $pull: { productos: productId }
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createCart,
  addProductToCart,
  getCartProducts,
  deleteCart,
  deleteCartProduct
};
