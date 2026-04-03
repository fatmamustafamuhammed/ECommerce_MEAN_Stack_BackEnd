import Cart from "../db/cart.js";

async function addToCart(userId, productId, quantity) {
  let product = await Cart.findOne({ userId: userId, productId: productId });
  let updatedCart;

  if (product) {
    if (product.quantity + quantity <= 0) {
      await removeFromCart(userId, productId);
      updatedCart = null;
    } else {
      updatedCart = await Cart.findByIdAndUpdate(
        product._id,
        { quantity: product.quantity + quantity },
        { new: true },
      );
    }
  } else {
    product = new Cart({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
    updatedCart = await product.save();
  }

  if (updatedCart) {
    return await Cart.findById(updatedCart._id).populate("productId");
  }
  return null;
}

async function removeFromCart(userId, productId) {
  return await Cart.findOneAndDelete({ userId: userId, productId: productId });
}

async function getCart(userId) {
  const products = await Cart.find({ userId: userId }).populate("productId");
  return products.map((x) => {
    return { quantity: x.quantity, product: x.productId };
  });
}

async function clearCart(userId) {
  await Cart.deleteMany({
    userId: userId,
  });
}

export { addToCart, removeFromCart, getCart, clearCart };
