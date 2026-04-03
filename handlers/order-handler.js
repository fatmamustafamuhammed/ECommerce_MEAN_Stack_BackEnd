import Order from "./../db/order.js";

async function addOrder(userId, modelOrder) {
  let totalAmount = modelOrder.totalAmount;
  /**
      if no totalAmount calculated ==> code will calculate it
      reduce: It loops through each element in the array and accumulates a specific value (like summing numbers)
      array.reduce((accumulator, currentItem) => {
        accumulator = the running total
        currentItem = each item in the array
        return accumulator + something;
      }, startingValue);
      Step1: (sum = 0,   item = Prod1) ==> price = 100, quantity = 2 ==> return 0 +   (100 × 2)  = 200
      Step2: (sum = 200, item = Prod2) ==> price = 50,  quantity = 1 ==> return 200 + (50 × 1)   = 250
      Step3: (sum = 250, item = Prod3) ==> price = 30,  quantity = 3 ==> return 250 + (30 × 3)   = 340
      FinalResult: totalAmount = 340
  */
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

async function getAdminOrder() {
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
