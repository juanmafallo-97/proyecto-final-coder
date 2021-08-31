const fs = require("fs");
const ProductsApi = require("./productsApi");

class CartsApi {
  constructor(fileName) {
    this.fileName = fileName;
    this.productsApi = new ProductsApi("products.json");
  }

  async create() {
    let id;
    try {
      const fileData = await fs.promises.readFile(this.fileName, "utf-8");
      const parsedData = JSON.parse(fileData);
      // Si todavía no hay ningún elemento asignamos el id 1
      if (!parsedData.length) id = 1;
      else {
        //Si no, toma el id del ultimo elemento y le sumamos 1
        id = parsedData[parsedData.length - 1].id + 1;
      }
      parsedData.push({ id, timestamp: Date.now(), productos: [] });
      await fs.promises.writeFile(this.fileName, JSON.stringify(parsedData));
      return id;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error escribiendo los datos: " + error.message
      );
    }
  }

  async getById(id) {
    try {
      const fileData = await fs.promises.readFile(
        "./" + this.fileName,
        "utf-8"
      );
      const object = JSON.parse(fileData).filter((obj) => obj.id === id);
      if (object.length) return object[0];
      // Si el array que obtenemos con el filter está vacío, devolvemos el error
      throw new Error("No se encuentra el producto especificado");
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }

  async deleteById(id) {
    try {
      const fileData = await fs.promises.readFile(
        "./" + this.fileName,
        "utf-8"
      );
      const cartToDelete = JSON.parse(fileData).find((cart) => cart.id === id);
      if (cartToDelete) {
        const newData = parsedData.filter((cart) => cart.id !== id);
        await fs.promises.writeFile(
          "./" + this.fileName,
          JSON.stringify(newData)
        );
      } else {
        throw new Error("No se encontró el carrito a eliminar");
      }
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error borrando el carrito: " + error.message
      );
    }
  }

  async getCartProducts(id) {
    try {
      const fileData = await fs.promises.readFile(
        "./" + this.fileName,
        "utf-8"
      );
      const cart = JSON.parse(fileData).find((cart) => cart.id === id);
      if (cart) {
        return cart.productos;
      } else throw new Error("El carrito buscado no existe");
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const fileData = await fs.promises.readFile(
        "./" + this.fileName,
        "utf-8"
      );
      const parsedData = JSON.parse(fileData);
      const cart = parsedData.find((cart) => cart.id === cartId);
      if (cart) {
        const product = await this.productsApi.getById(productId);
        cart.productos.push({ ...product });
        await fs.promises.writeFile(
          "./" + this.fileName,
          JSON.stringify(parsedData)
        );
      } else throw new Error("El carrito especificado no existe");
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error añadiendo el producto: " + error.message
      );
    }
  }
}

module.exports = CartsApi;
