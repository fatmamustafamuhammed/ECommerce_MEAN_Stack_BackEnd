import express from "express";
const router = express.Router();
import Category from "./../db/category.js";

router.post("/add", async (req, res) => {
  console.log("here is category route");
  let model = req.body;
  let category = new Category({
    name: model.name,
  });
  await category.save();
  res.send(category.toObject());
});

export default router;
