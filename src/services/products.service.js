import { productModel } from '../DAO/models/products.model.js';

class ProductService {
  validatePostProduct(name, description, price, stock, thumbnails, status, code, category) {
    if (!name || !description || !price || !stock || !thumbnails || status === undefined || !code || !category) {
      console.log('Validation error: Please provide all the required fields.');
      throw 'VALIDATION ERROR';
    }
  }

  validatePutProduct(id, name, description, price, stock, thumbnails, status, code, category) {
    if ((!id, !name || !description || !price || !stock || !thumbnails || status === undefined || !code || !category)) {
      console.log('Validation error: Please provide all the required fields.');
      throw 'VALIDATION ERROR';
    }
  }

  validateId(id) {
    if (!id) {
      console.log('Validation error: Please provide the product ID.');
      throw 'VALIDATION ERROR';
    }
  }

  async getAllProducts() {
    const products = await productModel.find({});
    return products;
  }

  async createProduct(name, description, price, stock, thumbnails, status, code, category) {
    this.validatePostProduct(name, description, price, stock, thumbnails, status, code, category);
    const productCreated = await productModel.create({ name, description, price, stock, thumbnails, status, code, category });
    return productCreated;
  }

  async updateProduct(id, name, description, price, stock, thumbnails, status, code, category) {
    this.validatePutProduct(id, name, description, price, stock, thumbnails, status, code, category);
    const productUpdated = await productModel.updateOne({ _id: id }, { name, description, price, stock, thumbnails, status, code, category });
    return productUpdated;
  }

  async deleteProduct(id) {
    this.validateId(id);
    const deleted = await productModel.deleteOne({ _id: id });
    return deleted;
  }
}

export const productService = new ProductService();