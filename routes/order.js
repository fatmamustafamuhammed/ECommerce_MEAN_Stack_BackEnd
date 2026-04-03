import express from "express";
import { getAdminOrder, updateOrderStatus } from "../handlers/order-handler.js";
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const orders = await getAdminOrder();
    console.log("Orders found:", orders.length);
    res.send(orders);
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    res.status(500).send({ message: "Failed to fetch orders" });
  }
});

router.put("/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    console.log(`Updating order ${orderId} to status: ${status}`);

    const updatedOrder = await updateOrderStatus(orderId, status);

    res.send({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send({ message: "Failed to update order status" });
  }
});

export default router;
