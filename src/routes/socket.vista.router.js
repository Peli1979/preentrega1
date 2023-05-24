import express from "express";


export const routerRealTimeProducts = express.Router();

routerRealTimeProducts.get("/", (req, res) => {
  return res.render("socket", {});
});
