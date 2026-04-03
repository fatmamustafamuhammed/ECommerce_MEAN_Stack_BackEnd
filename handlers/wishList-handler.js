import WishList from "./../db/wishList.js";

async function addToWishList(userId, productId) {
  const wishList = new WishList({ userId: userId, productId: productId });
  await wishList.save();
  return wishList.toObject();
}

async function removeFromWishList(userId, productId) {
  console.log("Removing - userId:", userId);
  console.log("Removing - productId:", productId);

  const result = await WishList.deleteOne({
    userId: userId,
    productId: productId,
  });

  console.log("Delete result:", result);

  if (result.deletedCount === 0) {
    console.log("No document found to delete");
  }

  return result;
}

async function getWishList(userId) {
  let wishLists = await WishList.find({ userId: userId }).populate("productId");

  return wishLists.map((x) => ({
    _id: x._id,
    product: x.productId,
    quantity: 1,
  }));
}

export { addToWishList, removeFromWishList, getWishList };
