import express from "express";
import  CartManager  from '../cartmanager.js';
const carro = new CartManager('./carts.json');

export const routerCarts = express.Router();

routerCarts.post("/", async (req, res) => {
    
    const cart = await carro.addCart();
    res.status(201).json({
    status: "success",
    msg: "creamos el producto que pediste",
    data: cart,
  });
});

