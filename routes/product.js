import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Configure multer storage
const uploadsDir = path.join(process.cwd(), "uploads");
console.log("Uploads directory:", uploadsDir);

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
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

// Delete single image
router.delete("/delete-image/:productId/:imageUrl", async (req, res) => {
  try {
    const { productId, imageUrl } = req.params;

    const decodedUrl = decodeURIComponent(imageUrl);
    let filename = decodedUrl.split("/").pop();
    filename = filename.split("?")[0];

    const imagePath = path.join(uploadsDir, filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`✅ Deleted file: ${imagePath}`);
    }

    if (productId && productId !== "temp" && productId !== "undefined") {
      const product = await getProductById(productId);
      if (product && product.images) {
        const updatedImages = product.images.filter(
          (img) => !img.includes(filename),
        );
        await updateProduct(productId, { images: updatedImages });
      }
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

// Delete product with its images
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params["id"];

    // Step 1: Get the product to find its images
    const product = await getProductById(id);

    if (product && product.images && product.images.length > 0) {
      console.log(`Deleting ${product.images.length} images for product ${id}`);

      // Step 2: Delete all associated image files
      for (const imageUrl of product.images) {
        try {
          // Extract filename from URL
          let filename = imageUrl.split("/").pop();
          filename = filename.split("?")[0];
          const imagePath = path.join(uploadsDir, filename);

          // Delete the file if it exists
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Deleted image: ${imagePath}`);
          } else {
            console.log(`Image not found: ${imagePath}`);
          }
        } catch (imgError) {
          console.error(`Error deleting image ${imageUrl}:`, imgError);
          // Continue with other images even if one fails
        }
      }
    }

    // Step 3: Delete the product from database
    await deleteProduct(id);
    console.log(`Product ${id} deleted successfully`);

    res.send({ message: "Product deleted successfully with all images" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
