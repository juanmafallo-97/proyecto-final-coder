const router = require("express").Router();
const ProductsApi = require("../api/products.js");

const productsApi = new ProductsApi("products.json");

router.get("/:id?", async (req, res) => {
  if (req.params.id) {
    try {
      const id = Number(req.params.id);
      const product = await productsApi.getById(id);
      res.json(product);
    } catch (err) {
      res.json({ error: err.message });
    }
  } else {
    try {
      const products = await productsApi.getAll();
      res.json(products);
    } catch (err) {
      res.json({ error: err.message });
    }
  }
});

module.exports = router;
