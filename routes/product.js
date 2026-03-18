import express from "express";
import multer from "multer";
const router = express.Router();
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../handlers/product-handler.js";

// Create
router.post("/add", async (req, res) => {
  console.log("here is product route");
  let model = req.body;
  let result = await addProduct(model);
  res.send(result);
});

// Get all
router.get("/get", async (req, res) => {
  let result = await getProducts();
  res.send(result);
});

// Get by Id
router.get("/get/:id", async (req, res) => {
  let id = req.params["id"];
  let result = await getProductById(id);
  res.send(result);
});

// Update
router.put("/update/:id", async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateProduct(id, model);
  res.send({ message: "Product Updated Successfully" });
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteProduct(id);
  res.send({ message: "Product deleted Successfully" });
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("images"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const imageUrls = req.files.map((f) => `${baseUrl}/uploads/${f.filename}`);

  res.json({ imageUrls });
});

export default router;
