
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



routerCarts.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params;
  const pid = req.params;

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


routerCarts.get('/:cid', async (req, res) => {
  const cid = req.params.cid;

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
  /*res.status(201).json({
    status: "success",
    msg: "creamos el producto que pediste",
    data: cart,
  })
  /*const cid = req.params.cid
  const cart = await carro.getCartById(cid)
  const pid = req.params.pid
  const product = cart.products.find((prod)=>prod.id == id)
  if (product){
      product.quantity++
  }
  else{
    const newProduct = {
      pid, quantity : 1
    }

  }
  */
  
  

  

})
