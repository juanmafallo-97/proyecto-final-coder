const router = require("express").Router();
const CartsApi = require("../api/cartsApi");

const cartsApi = new CartsApi("carts.json");

router.post("/", async (req, res) => {
  try {
    const newCartId = await cartsApi.create();
    res.json({ success: true, newCartId });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post("/:id/productos", async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    await cartsApi.addProductToCart(cartId, req.body.productId);
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
