const router = require("express").Router();
const cartController = require("../controllers/cartController");
/* const CartsApi = require("../api/cartsApi");

const cartsApi = new CartsApi("carts.json"); */

router.post("/", cartController.createCart);

router.post("/:id/productos", cartController.addProductToCart);

/* router.get("/:id/productos", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const cartProducts = await cartsApi.getCartProducts(id);
    res.json({ error: false, data: cartProducts });
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
 */
module.exports = router;
