import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  date: Date,
  items: Array(Schema.Types.Mixed),
  paymentType: String,
  address: Schema.Types.Mixed,
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  totalAmount: { type: Number, default: 0, required: true },
});

const Order = mongoose.model("orders", orderSchema);
export default Order;
