import express from "express";
import mongoose from "mongoose";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import brandRoutes from "./routes/brand.js";
import customerRoutes from "./routes/customer.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/category", categoryRoutes);
console.log("Category routes registered");
app.use("/product", productRoutes);
console.log("Product routes registered");
app.use("/brand", brandRoutes);
console.log("Brand routes registered");
app.use("/customer", customerRoutes);
console.log("Customer routes registered");

app.get("/", (req, res) => {
  res.send("Server running");
});

async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "e-comm-store-db",
  });
  console.log("mongodb connected");
}

connectDb().catch((err) => {
  console.error(err);
});

app.listen(port, () => {
  console.log("Server is Running on Port", port);
});
