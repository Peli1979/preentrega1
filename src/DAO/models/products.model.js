import { Schema, model } from "mongoose";

export const productModel = model(
  "products",
  new Schema({
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnails: { type: String, required: true, max: 100 },
    status: { type: Boolean, required: true },
    code: { type: String, required: true, max: 100, unique: true },
    category: { type: String, required: true, max: 100 },
  })
);

