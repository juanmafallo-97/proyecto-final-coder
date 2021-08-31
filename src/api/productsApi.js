const fs = require("fs");

class ProductsApi {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(product) {
    let id;
    try {
      const fileData = await fs.promises.readFile(this.fileName, "utf-8");
      const parsedData = JSON.parse(fileData);
      // Si todavía no hay ningún elemento asignamos el id 1
      if (!parsedData.length) id = 1;
      else {
        //Si no toma el id del ultimo elemento y le sumamos 1
        id = parsedData[parsedData.length - 1].id + 1;
      }
      parsedData.push({ id, timestamp: Date.now(), ...product });
      await fs.promises.writeFile(this.fileName, JSON.stringify(parsedData));
      return await this.getById(id);
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
      const product = JSON.parse(fileData).filter((prod) => prod.id === id);
      if (product.length) return product[0];
      // Si el array que obtenemos con el filter está vacío, devolvemos el error
      throw new Error("No se encuentra el producto especificado");
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }

  async getAll() {
    try {
      const fileData = await fs.promises.readFile(
        "./" + this.fileName,
        "utf-8"
      );
      return JSON.parse(fileData);
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const fileData = await fs.promises.readFile(
        "./" + this.fileName,
        "utf-8"
      );
      const parsedData = JSON.parse(fileData);
      const newData = parsedData.map((product) => {
        if (product.id === id) {
          return { ...updatedProduct, id: product.id };
        } else {
          return product;
        }
      });
      await fs.promises.writeFile(
        "./" + this.fileName,
        JSON.stringify(newData)
      );
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error actualizando el producto:" + error.message
      );
    }
  }

  async deleteById(id) {
    try {
      const fileData = await fs.promises.readFile(
        "./" + this.fileName,
        "utf-8"
      );
      const parsedData = JSON.parse(fileData);
      const productToDelete = parsedData.find((product) => product.id === id);
      if (productToDelete) {
        const newData = parsedData.filter((product) => product.id !== id);
        await fs.promises.writeFile(
          "./" + this.fileName,
          JSON.stringify(newData)
        );
      } else {
        throw new Error("No se encontró el producto especificado");
      }
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error borrando el producto: " + error.message
      );
    }
  }
}

module.exports = ProductsApi;
