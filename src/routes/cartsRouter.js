const router = require("express").Router();
const CartsApi = require("../api/cartsApi");

const cartsApi = new CartsApi("carts.json");

router.get("/:id/productos", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const cartProducts = await cartsApi.getCartProducts(id);
    res.json({ error: false, data: cartProducts });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCartId = await cartsApi.create();
    res.json({ error: false, data: newCartId });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post("/:id/productos", async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    await cartsApi.addProductToCart(cartId, req.body.productId);
    res.json({ error: false, message: "Producto agregado exitosamente" });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await cartsApi.deleteById(id);
    res.json({ error: false, message: "Carrito eliminado exitosamente" });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    const productId = Number(req.params.id_prod);
    await cartsApi.deleteCartProduct(cartId, productId);
    res.json({
      error: false,
      message: "Producto eliminado del carrito exitosamente"
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
