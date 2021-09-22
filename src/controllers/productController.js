const Product = require("../models/Product");
const productsService = require("../services/productsService");

const getProducts = async (req, res) => {
  if (req.params.id) {
    try {
      const id = req.params.id;
      const product = await productsService.getProductById(id);
      res.json({ error: false, data: product });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  } else {
    try {
      const products = await productsService.getAllProducts();
      res.json({ error: false, data: products });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  }
};

const saveProduct = async (req, res) => {
  const isAuth = req.auth;
  try {
    if (!isAuth)
      res.json({
        error: 401,
        descripcion: `Ruta ${req.originalUrl}, método ${req.method} no autorizada`
      });
    const newProductId = await productsService.createProduct(req.body);
    res.json({ error: false, data: newProductId });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const updateProduct = async (req, res) => {
  const isAuth = req.auth;
  try {
    if (!isAuth)
      res.json({
        error: 401,
        descripcion: `Ruta ${req.originalUrl}, método ${req.method} no autorizada`
      });
    await productsService.updateProduct(req.params.id, req.body);
    res.json({ error: false, message: "Producto actualizado exitosamente" });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const isAuth = req.auth;
  try {
    if (!isAuth)
      res.json({
        error: 401,
        descripcion: `Ruta ${req.originalUrl}, método ${req.method} no autorizada`
      });
    await productsService.deleteProduct(req.params.id);
    res.json({ error: false, message: "Producto eliminado exitosamente" });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

module.exports = {
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
};
