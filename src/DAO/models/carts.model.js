import { Schema, model } from "mongoose";

export const cartModel = model(
  "carts",
  new Schema({
    products: { type: Array, required: true },
  })
);