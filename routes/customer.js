import express from "express";
import {
  getFeaturedProducts,
  getNewProducts,
  getProductForListing,
  getProductById,
} from "../handlers/product-handler.js";
import { getCategories } from "../handlers/category-handler.js";
import { getBrands } from "../handlers/brand-handler.js";
import {
  addToWhishList,
  removeFromWhishList,
  getWhishList,
} from "../handlers/wishList-handler.js";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../handlers/shopping-cart-handler.js";
import { addOrder, getCustomerOrder } from "../handlers/order-handler.js";
import { clearCart } from "../handlers/shopping-cart-handler.js";

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

router.get("/brands", async (req, res) => {
  const brands = await getBrands();
  res.send(brands);
});

router.get("/products", async (req, res) => {
  const { searchTerm, categoryId, brandId, sortBy, sortOrder, pageSize, page } =
    req.query;
  const products = await getProductForListing(
    searchTerm,
    categoryId,
    brandId,
    page,
    pageSize,
    sortBy,
    sortOrder,
  );
  res.send(products);
});

// Get by Id
router.get("/product/:id", async (req, res) => {
  let id = req.params["id"];
  let result = await getProductById(id);
  res.send(result);
});

router.get("/whishLists", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const items = await getWhishList(userId);
  res.send(items);
});

router.post("/whishLists/:id", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.id;
  const item = await addToWhishList(userId, productId);
  res.send(item);
});

router.delete("/whishLists/:id", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.id;
  await removeFromWhishList(userId, productId);
  res.send({ message: "Deleted" });
});

router.get("/carts", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const items = await getCart(userId);
  res.send(items);
});

router.post("/carts/:id", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.id;
  const quantity = req.body.quantity;
  const items = await addToCart(userId, productId, quantity);
  res.send(items);
});

router.post("/order", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const order = req.body;
  await addOrder(userId, order);
  await clearCart(userId);
  return res.send({
    message: "Order Created",
  });
});

router.get("/order/get", async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getCustomerOrder(userId);
    return res.send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).send({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

export default router;
