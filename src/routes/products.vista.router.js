import express from "express";
//import { productos } from "../utils.js";
import  ProductManager  from '../DAO/productmanager.js';
const alfombra = new ProductManager('./products.json');


export const routerVistaProducts = express.Router();
routerVistaProducts.get("/", async (req, res) => {
const productos=await alfombra.getProducts()
  return res.render("productos-html", {
    titulo: "TITULO: PRODUCTOS",
    productos: productos,
  })
});