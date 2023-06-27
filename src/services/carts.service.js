import { cartModel } from '../DAO/models/carts.model.js';

class CartService {
    async getAllCarts() {
      const carts = await cartModel.find({});
      return carts;
    }
  
    async getCartById(cid) {
      const cart = await cartModel.findById(cid);
      return cart;
    }
  
    async createCart() {
      const cart = await cartModel.create({ products: [] });
      return cart;
    }
  
    async addProductToCart(cid, pid) {
      const cart = await cartModel.findById(cid);
      if (cart) {
        const existingProduct = cart.products.find((product) => product.idProduct === pid);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          const newProduct = { idProduct: pid, quantity: 1 };
          cart.products.push(newProduct);
        }
        const updatedCart = await cart.save();
        return updatedCart;
      } else {
        throw new Error('Carrito no encontrado');
      }
    }
  
    async removeProductFromCart(cid, pid) {
      const cart = await cartModel.findById(cid);
      if (cart) {
        const existingProduct = cart.products.find((product) => product.idProduct === pid);
        if (existingProduct) {
          existingProduct.quantity--;
          if (existingProduct.quantity === 0) {
            cart.products = cart.products.filter((product) => product.idProduct !== pid);
          }
          const updatedCart = await cart.save();
          return updatedCart;
        } else {
          throw new Error('Producto no encontrado en el carrito');
        }
      } else {
        throw new Error('Carrito no encontrado');
      }
    }
  
    async deleteCart(cid) {
      const deletedCart = await cartModel.findByIdAndDelete(cid);
      return deletedCart;
    }
  }
  
  export const cartService = new CartService();