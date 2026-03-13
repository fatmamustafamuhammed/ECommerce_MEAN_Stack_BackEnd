import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  date: Date,
  items: Array(any),
  status: Number,
});
const Order = mongoose.model("orders", orderSchema);
export default Order;
