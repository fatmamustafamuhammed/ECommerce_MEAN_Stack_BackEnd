import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: Date,
  items: Array(mongoose.Schema.Types.Mixed),
  paymentType: String,
  address: mongoose.Schema.Types.Mixed,
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  totalAmount: { type: Number, default: 0, required: true },
});
const Order = mongoose.model("orders", orderSchema);
export default Order;
