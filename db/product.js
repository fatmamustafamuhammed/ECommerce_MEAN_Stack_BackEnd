import mongoose from "mongoose";
const { Schema } = mongoose;
const productSchema = new mongoose.Schema({
  name: String,
  shortDescription: String,
  description: String,
  price: Number,
  discount: Number,
  images: Array(String),
  categoryId: { type: Schema.Types.ObjectId, ref: "categories" },
});
const Product = mongoose.model("products", productSchema);
export default Product;
