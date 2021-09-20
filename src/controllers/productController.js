const Product = require("../models/Product");

const getProducts = async (req, res) => {
  if (req.params.id) {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      res.json({ error: false, data: product });
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  } else {
    try {
      const products = await Product.find();
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
    const product = new Product(req.body);
    await product.save(product);
    res.json({ error: false, data: product });
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
    const id = req.params.id;
    const product = req.body;
    await Product.updateOne({ _id: id }, product);
    const updatedProduct = await Product.findById(id);
    res.json({ error: false, data: updatedProduct });
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
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
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
