import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  #generateId() {
    let maxId = 0;
    for (let i = 0; i < this.products.length; i++) {
      const prod = this.products[i];
      if (prod.id > maxId) {
        maxId = prod.id;
      }
    }
    return ++maxId;
  }

  async loadProducts() {
    try {
      const productString = await fs.promises.readFile(this.path, 'utf8');
      const prod = JSON.parse(productString);
      this.products = prod;
    } catch (err) {
      console.error(`Error reading file ${this.path}: ${err}`);
      this.products = [];
    }
  }

  async saveProducts() {
    try {
      const prodString = JSON.stringify(this.products);
      await fs.promises.writeFile(this.path, prodString);
    } catch (err) {
      console.error(`Error writing file ${this.path}: ${err}`);
    }
  }

  async getProducts() {
    this.loadProducts();
    return this.products;
  }

  async getProductById(id) {
    this.loadProducts();
    const encontrado = this.products.find((prod) => prod.id == id);
    if (encontrado) {
      return encontrado;
    } else {
      console.error("Product not found");
    }
  }

  async addProduct(product) {
    this.loadProducts();
    const { title, description, category, status, price, thumbnail, code, stock } = product;
    if (!title || !description || !price || !code || !stock|| !category|| !status) {
      console.log("All fields are required");
      return;
    }

    if (this.products.some((p) => p.code === code)) {
      console.log("Code already exists, please choose another one");
      return;
    }

    const newProduct = {
      ...product,
      id: this.#generateId(),
    };

    this.products.push(newProduct);
    await this.saveProducts();
  }

  async updateProduct(id, newProduct) {
    this.loadProducts();
    const index = this.products.findIndex((prod) => prod.id == id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...newProduct };
      await this.saveProducts();
    } else {
      console.error("Product not found");
    }
  }

  async deleteProduct(id) {
    console.error(id);
    await this.loadProducts();
    const index = this.products.findIndex((prod) => prod.id == id);
    if (index !== -1) {
      this.products.splice(index, 1);
      await this.saveProducts();
    } else {
      console.error("Product not found");
    }
  }
}


export default ProductManager;