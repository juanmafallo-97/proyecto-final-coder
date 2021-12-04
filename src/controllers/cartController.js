const cartsService = require("../services/cartsService");

const createCart = async (req, res) => {
  try {
    const newCartId = await cartsService.createCart();
    res.json({ error: false, id_carrito: newCartId });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    if (!req.body.productId)
      throw new Error("Falta indicar el id del producto en el campo productId");
    await cartsService.addProductToCart(req.params.id, req.body.productId);
    res.json({
      error: false,
      message: "Producto agregado al carrito exitosamente"
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const cartProducts = await cartsService.getCartProducts(req.params.id);
    res.json({ error: false, data: cartProducts });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    await cartsService.deleteCart(req.params.id);
    res.json({ error: false, message: "Carrito eliminado exitosamente" });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const deleteCartProduct = async (req, res) => {
  try {
    await cartsService.deleteCartProduct(req.params.id, req.params.id_prod);
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
