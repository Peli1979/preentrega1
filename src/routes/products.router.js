import express from "express";
import { uploader } from "../utils.js";
import  ProductManager  from '../productmanager.js';
const alfombra = new ProductManager('./products.json');

export const routerProducts = express.Router();
routerProducts.get("/", async (req, res) => {
    const limit = req.query.limit;
    const products = await alfombra.getProducts();
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  });

routerProducts.get("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const product = await alfombra.getProductById(pid);
    if (!product) {
      res.status(404).json('Product not found');
    } else {
      res.json(product);
    }
  });

routerProducts.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  await alfombra.deleteProduct(pid);
 
  return res.status(200).json({
    status: "success",
    msg: "se elimino el producto con el id:" + pid,
    data: {},
  });
});

routerProducts.put("/:pid", async (req, res) => {
    const  pid  = req.params.pid;
    const product = req.body;
    await alfombra.updateProduct(pid, product);
    res.json({
        status: "success",
      msg: 'Producto actualizado exitosamente',
      data: {product}
    });
  });

routerProducts.post("/", uploader.single("thumbnail"),async (req, res) => {
  if (!req.file) {
    res.status(400).send({
      status: "error",
      msg: "error no enviaste una foto o no se puedo subir la misma",
      data: {},
    });
  }

    const product = req.body;
    product.thumbnail = "http://localhost:8080/" + req.file.filename;
    await alfombra.addProduct(product);
    res.status(201).json({
    status: "success",
    msg: "creamos el producto que pediste",
    data: product,
  });
});