const Product = require("../models/Product");

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllProducts = async () => {
  try {
    const products = await Product.find().select({ __v: 0 });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

const createProduct = async (product) => {
  try {
    const newProduct = new Product(product);
    const { _id } = await newProduct.save();
    return _id;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (id, productData) => {
  try {
    await Product.updateOne({ _id: id }, productData);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    await Product.deleteOne({ _id: id });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
