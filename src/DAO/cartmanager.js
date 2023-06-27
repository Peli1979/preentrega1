
import fs from 'fs';

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const cartString = await fs.promises.readFile(this.filePath, 'utf8');
      const carts = JSON.parse(cartString);
      this.carts = carts;
    } catch (err) {
      console.error(`Error reading file ${this.filePath}: ${err}`);
      this.carts = [];
    }
  }

  async saveCarts() {
    try {
      const cartString = JSON.stringify(this.carts);
      await fs.promises.writeFile(this.filePath, cartString);
    } catch (err) {
      console.error(`Error writing file ${this.filePath}: ${err}`);
    }
  }

  async getAllCarts() {
    await this.loadCarts();
    return this.carts;
  }

  async getCartById(id) {
    await this.loadCarts();
    const encontrado = this.carts.find((cart) => cart.id == id);
    if (encontrado) {
      return encontrado;
    } else {
      console.error("Product not found");
    }
  }
  

  async addCart() {
    await this.loadCarts();
    const newCart = {
      id: (Math.random() * 1000000000).toFixed(0),
      products: [],
    };
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  

  async updateCart(id, newData) {
    await this.loadCarts();
    const cartIndex = this.carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      this.carts[cartIndex] = { ...this.carts[cartIndex], ...newData };
      await this.saveCarts();
      return this.carts[cartIndex];
    }
    return null;
  }

  async deleteCart(id) {
    await this.loadCarts();
    const cartIndex = this.carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      const deletedCart = this.carts.splice(cartIndex, 1);
      await this.saveCarts();
      return deletedCart[0];
    }
    return null;
  }

  
}

export default CartManager;

/*import fs from 'fs';

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.loadCarts();
  }

 
    

  async loadCarts() {
    try {
      const cartString = await fs.promises.readFile(this.path, 'utf8');
      const cart = JSON.parse(cartString);
      this.carts = cart;
    } catch (err) {
      console.error(`Error reading file ${this.path}: ${err}`);
      this.carts = [];
    }
  }

  async saveCarts() {
    try {
      const cartString = JSON.stringify(this.carts);
      await fs.promises.writeFile(this.path, cartString);
    } catch (err) {
      console.error(`Error writing file ${this.path}: ${err}`);
    }
  }

  async getCarts() {
    this.loadCarts();
    return this.carts;
  }

  async getCartsById(id) {
    this.loadCarts();
    const encontrado = this.carts.find((c) => c.id == id);
    if (encontrado) {
      return encontrado;
    } else {
      console.error("Cart not found");
    }
  }

  async addProduct(cart) {
    this.loadCarts();
    const { title, description, price, thumbnail, code, stock } = cart;
    if (!title || !description || !price || !code || !stock) {
      console.log("All fields are required");
      return;
    }

    if (this.carts.some((p) => p.code === code)) {
      console.log("Code already exists, please choose another one");
      return;
    }

    const newCart = {
      ...cart,
      id: (Math.random() * 1000000000).toFixed(0),
    };

    this.cart.push(newCart);
    await this.saveCarts();
  }

  async updateCart(id, newCart) {
    this.loadCarts();
    const index = this.carts.findIndex((c) => c.id == id);
    if (index !== -1) {
      this.carts[index] = { ...this.carts[index], ...newCart };
      await this.saveCarts();
    } else {
      console.error("Product not found");
    }
  }

  async deleteCart(id) {
    await this.loadCarts();
    const index = this.carts.findIndex((c) => c.id == id);
    if (index !== -1) {
      this.carts.splice(index, 1);
      await this.saveCarts();
    } else {
      console.error("Product not found");
    }
  }
}


export default CartManager;*/