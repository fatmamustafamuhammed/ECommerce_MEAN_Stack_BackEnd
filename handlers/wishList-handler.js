import WhishList from "./../db/wishList.js";

async function addToWhishList(userId, productId) {
  const whishList = new WhishList({
    userId: userId,
    productId: productId,
  });
  await whishList.save();
  return whishList.toObject();
}

async function removeFromWhishList(userId, productId) {
  console.log("Removing - userId:", userId);
  console.log("Removing - productId:", productId);

  const result = await WhishList.deleteOne({
    userId: userId,
    productId: productId,
  });

  console.log("Delete result:", result);

  if (result.deletedCount === 0) {
    console.log("No document found to delete");
  }

  return result;
}

async function getWhishList(userId) {
  let whishLists = await WhishList.find({ userId: userId }).populate("productId");
  
  return whishLists.map((x) => ({
    _id: x._id,
    product: x.productId,
    quantity: 1
  }));
}

export { addToWhishList, removeFromWhishList, getWhishList };
