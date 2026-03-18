import express from "express";
const router = express.Router();
import {
  addBrand,
  deleteBrand,
  getBrands,
  getBrandById,
  updateBrand,
} from "../handlers/brand-handler.js";

// Create
router.post("/add", async (req, res) => {
  console.log("here is brand route");
  let model = req.body;
  let result = await addBrand(model);
  res.send(result);
});

// Get all
router.get("/get", async (req, res) => {
  let result = await getBrands();
  res.send(result);
});

// Get by Id
router.get("/get/:id", async (req, res) => {
  let id = req.params["id"];
  let result = await getBrandById(id);
  res.send(result);
});

// Update
router.put("/update/:id", async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateBrand(id, model);
  res.send({ message: "Brand Updated Successfully" });
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteBrand(id);
  res.send({ message: "Brand deleted Successfully" });
});

export default router;
