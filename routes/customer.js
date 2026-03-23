import express from "express";
import {
  getFeaturedProducts,
  getNewProducts,
} from "../handlers/product-handler.js";
const router = express.Router();

router.get("/new-products", async (req, res) => {
  const products = await getNewProducts();
  res.send(products);
});

router.get("/featured-products", async (req, res) => {
  const products = await getFeaturedProducts();
  res.send(products);
});

export default router;
