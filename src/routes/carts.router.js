
import express from "express";
//import  CartManager  from '../cartmanager.js';
//const carro = new CartManager('./carts.json');


/*export const routerCarts = express.Router();

routerCarts.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  
  try {
    const cart = await carro.getCartById(cid);
    if (cart) {
      const existingProduct = cart.products.find((product) => product.idProduct === pid);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const newProduct = { idProduct: pid, quantity: 1 };
        cart.products.push(newProduct);
      }

      await carro.saveCarts();
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

routerCarts.get("/", async (req, res) => {
  
  try {
    const cart = await carro.getAllCarts();
      res.json(cart)
   
    }
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

routerCarts.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  console.log(cid)
  try {
    const cart = await carro.getCartById(cid);
    
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

routerCarts.post("/", async (req, res) => {
    
  const cart = await carro.addCart();
  res.status(201).json({
  status: "success",
  msg: "creamos tu carrito de compras",
  data: cart,
});

})*/


import { cartService } from '../services/carts.service.js';

export const routerCarts = express.Router();

routerCarts.get('/', async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    return res.status(200).json({
      status: 'success',
      msg: 'Lista de carritos',
      data: carts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      msg: 'Ocurrió un error interno :(',
      data: {},
    });
  }
});

routerCarts.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);
    if (cart) {
      return res.status(200).json({
        status: 'success',
        msg: 'Carrito encontrado',
        data: cart,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        msg: 'Carrito no encontrado',
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      msg: 'Ocurrió un error interno :(',
      data: {},
    });
  }
});

routerCarts.post('/', async (req, res) => {
  try {
    const cart = await cartService.createCart();
    return res.status(201).json({
      status: 'success',
      msg: 'Carrito creado',
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      msg: 'Ocurrió un error interno :(',
      data: {},
    });
  }
});

routerCarts.put('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartService.addProductToCart(cid, pid);
    return res.status(200).json({
      status: 'success',
      msg: 'Producto agregado al carrito',
      data: updatedCart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      msg: 'Ocurrió un error interno :(',
      data: {},
    });
  }
});

routerCarts.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartService.removeProductFromCart(cid, pid);
    return res.status(200).json({
      status: 'success',
      msg: 'Producto eliminado del carrito',
      data: updatedCart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      msg: 'Ocurrió un error interno :(',
      data: {},
    });
  }
});

routerCarts.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const deletedCart = await cartService.deleteCart(cid);
    return res.status(200).json({
      status: 'success',
      msg: 'Carrito eliminado',
      data: deletedCart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      msg: 'Ocurrió un error interno :(',
      data: {},
    });
  }
});