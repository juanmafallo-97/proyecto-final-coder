const router = require("express").Router();
const ProductsApi = require("../api/productsApi.js");

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

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productsApi.save(product);
    res.json({ success: "Producto creado exitosamente", newProduct });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = req.body;
    await productsApi.updateProduct(id, product);
    const updatedProduct = await productsApi.getById(id);
    res.json({ success: "Producto actualizado exitosamente", updatedProduct });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await productsApi.deleteById(id);
    res.json({ success: `Producto con id ${id} eliminado exitosamente` });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
