const router = require("express").Router();
const cartController = require("../../controllers/cartController");

router.post("/", cartController.createCart);
router.post("/:id/productos", cartController.addProductToCart);
router.get("/:id/productos", cartController.getCartProducts);
router.delete("/:id", cartController.deleteCart);
router.delete("/:id/productos/:id_prod", cartController.deleteCartProduct);

module.exports = router;
