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
  addToWishList,
  removeFromWishList,
  getWishList,
} from "../handlers/wishList-handler.js";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../handlers/shopping-cart-handler.js";
import { addOrder, getCustomerOrder } from "../handlers/order-handler.js";
import { clearCart } from "../handlers/shopping-cart-handler.js";

const router = express.Router();
// New Products
router.get("/new-products", async (req, res) => {
  const products = await getNewProducts();
  res.send(products);
});

// Featured Products
router.get("/featured-products", async (req, res) => {
  const products = await getFeaturedProducts();
  res.send(products);
});

// Categories
router.get("/categories", async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});

// Brands
router.get("/brands", async (req, res) => {
  const brands = await getBrands();
  res.send(brands);
});

// Products
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

router.get("/product/:id", async (req, res) => {
  let id = req.params["id"];
  let result = await getProductById(id);
  res.send(result);
});

// WishtLists
router.get("/wishLists", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const items = await getWishList(userId);
  res.send(items);
});

router.post("/wishLists/:id", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.id;
  const item = await addToWishList(userId, productId);
  res.send(item);
});

router.delete("/wishLists/:id", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.id;
  await removeFromWishList(userId, productId);
  res.send({ message: "Deleted" });
});

// Carts
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

  await addToCart(userId, productId, quantity);
  const updatedCart = await getCart(userId);

  res.send(updatedCart);
});

router.delete("/carts/:id", async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.id;

    const deletedItem = await removeFromCart(userId, productId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const updatedCart = await getCart(userId);
    res.send(updatedCart);
  } catch (error) {
    console.error("Error deleting from cart:", error);
    res.status(500).json({ message: "Failed to delete item from cart" });
  }
});

// Orders
router.post("/order", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const order = req.body;
  await addOrder(userId, order);
  await clearCart(userId);
  return res.send({ message: "Order Created" });
});

router.get("/order/get", async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getCustomerOrder(userId);
    return res.send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).send({ message: "Failed to fetch orders" });
  }
});

export default router;
