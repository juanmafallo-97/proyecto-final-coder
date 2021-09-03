const router = require("express").Router();
const ProductsApi = require("../api/productsApi.js");

const productsApi = new ProductsApi("products.json");

router.get("/:id?", async (req, res) => {
  if (req.params.id) {
    try {
      const id = Number(req.params.id);
      const product = await productsApi.getById(id);
      res.json({ error: false, data: product });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  } else {
    try {
      const products = await productsApi.getAll();
      res.json({ error: false, data: products });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  }
});

router.post("/", async (req, res) => {
  const isAuth = req.auth;
  try {
    if (!isAuth)
      res.json({
        error: 401,
        descripcion: `Ruta ${req.originalUrl}, método ${req.method} no autorizada`
      });
    const product = req.body;
    const newProduct = await productsApi.save(product);
    res.json({ error: false, data: newProduct });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const isAuth = req.auth;
  try {
    if (!isAuth)
      res.json({
        error: 401,
        descripcion: `Ruta ${req.originalUrl}, método ${req.method} no autorizada`
      });
    const id = Number(req.params.id);
    const product = req.body;
    await productsApi.updateProduct(id, product);
    const updatedProduct = await productsApi.getById(id);
    res.json({ error: false, data: updatedProduct });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const isAuth = req.auth;
  try {
    if (!isAuth)
      res.json({
        error: 401,
        descripcion: `Ruta ${req.originalUrl}, método ${req.method} no autorizada`
      });
    const id = Number(req.params.id);
    await productsApi.deleteById(id);
    res.json({ error: false, message: "Producto eliminado exitosamente" });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
