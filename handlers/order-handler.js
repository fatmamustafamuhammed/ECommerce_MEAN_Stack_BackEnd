import Order from "./../db/order.js";

async function addOrder(userId, modelOrder) {
  let totalAmount = modelOrder.totalAmount;
  if (!totalAmount && modelOrder.items) {
    totalAmount = modelOrder.items.reduce((sum, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return sum + price * quantity;
    }, 0);
  }

  let order = new Order({
    ...modelOrder,
    userId: userId,
    status: "pending",
    date: new Date(),
    totalAmount: totalAmount || 0,
  });
  await order.save();
  return order;
}

async function getCustomerOrder(userId) {
  let orders = await Order.find({ userId: userId });
  return orders.map((x) => x.toObject());
}

async function getAdminOrder(userId) {
  let orders = await Order.find();
  return orders.map((x) => x.toObject());
}

async function updateOrderStatus(orderId, newStatus) {
  try {
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true },
    );

    if (!updatedOrder) {
      throw new Error(`Order not found: ${orderId}`);
    }

    console.log(`Order ${orderId} status updated to: ${newStatus}`);
    return updatedOrder.toObject();
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}
export { addOrder, getCustomerOrder, getAdminOrder, updateOrderStatus };
