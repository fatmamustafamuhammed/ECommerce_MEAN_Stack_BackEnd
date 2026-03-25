import express from "express";
import {
  getFeaturedProducts,
  getNewProducts,
  getProductForListing,
} from "../handlers/product-handler.js";
import { getCategories } from "../handlers/category-handler.js";
const router = express.Router();

router.get("/new-products", async (req, res) => {
  const products = await getNewProducts();
  res.send(products);
});

router.get("/featured-products", async (req, res) => {
  const products = await getFeaturedProducts();
  res.send(products);
});

router.get("/categories", async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});

router.get("/products", async (req, res) => {
  const { searchTerm, categoryId, brandId, sortBy, sortOrder, pageSize, page } =
    req.query;
  const products = await getProductForListing(
    searchTerm,
    categoryId,
    page,
    pageSize,
    sortBy,
    sortOrder,
    brandId,
  );
  res.send(products);
});

export default router;
