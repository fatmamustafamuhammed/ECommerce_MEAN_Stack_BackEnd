import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
  name: String,
});
const Brand = mongoose.model("brands", brandSchema);
export default Brand;
