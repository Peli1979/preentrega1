import express from "express";
import { uploader } from "../utils/multer.js";

import { productService } from '../services/products.service.js';
export const routerProducts = express.Router();

routerProducts.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json({
      status: 'success',
      msg: 'product list',
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

routerProducts.post('/',uploader.single("thumbnail"), async (req, res) => {
  try {
    const { name, description, price, stock, thumbnails, status, code, category } = req.body;
    const productCreated = await productService.createProduct(name, description, price, stock, thumbnails, status, code, category);

    return res.status(201).json({
      status: 'success',
      msg: 'product created',
      data: productCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

routerProducts.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, thumbnails, status, code, category } = req.body;

    const productUpdated = await productService.updateProduct(id, name, description, price, stock, thumbnails, status, code, category);
    return res.status(201).json({
      status: 'success',
      msg: 'product updated',
      data: productUpdated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

routerProducts.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);
    return res.status(200).json({
      status: 'success',
      msg: 'product deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

//import  ProductManager  from '../productmanager.js';
//const alfombra = new ProductManager('./products.json');

/*export const routerProducts = express.Router();
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
});*/
