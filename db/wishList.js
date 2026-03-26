import mongoose from "mongoose";
const { Schema } = mongoose;

const wishListSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  productId: { type: Schema.Types.ObjectId, ref: "products" },
});
const WishList = mongoose.model("wishLists", wishListSchema);
export default WishList;
