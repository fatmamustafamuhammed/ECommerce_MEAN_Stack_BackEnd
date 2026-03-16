import express from "express";
const router = express.Router();
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../handlers/category-handler.js";

// Create
router.post("/add", async (req, res) => {
  console.log("here is category route");
  let model = req.body;
  let result = await addCategory(model);
  res.send(result);
});

// Get all
router.get("/get", async (req, res) => {
  let result = await getCategories();
  res.send(result);
});

// Get by Id
router.get("/get/:id", async (req, res) => {
  let id = req.params["id"];
  let result = await getCategoryById(id);
  res.send(result);
});

// Update
router.put("/update/:id", async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateCategory(id, model);
  res.send({ message: "Category Updated Successfully" });
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteCategory(id);
  res.send({ message: "Category deleted Successfully" });
});

export default router;
