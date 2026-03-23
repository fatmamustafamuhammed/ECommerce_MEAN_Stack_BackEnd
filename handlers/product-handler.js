import Product from "./../db/product.js";

async function addProduct(model) {
  let product = new Product({
    ...model,
  });
  await product.save();
  return product.toObject();
}

async function getProducts() {
  let products = await Product.find();
  return products.map((c) => c.toObject());
}

async function getProductById(id) {
  let product = await Product.findById(id);
  return product.toObject();
}

async function updateProduct(id, model) {
  await Product.findOneAndUpdate({ _id: id }, model);
  return;
}

async function deleteProduct(id) {
  await Product.findOneAndDelete({ _id: id });
  return;
}

async function getNewProducts() {
  let newProducts = await Product.find({
    isnew: true,
  });
  return newProducts.map((x) => x.toObject());
}

async function getFeaturedProducts() {
  let FeaturedProducts = await Product.find({
    isFeatured: true,
  });
  return FeaturedProducts.map((x) => x.toObject());
}

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getNewProducts,
  getFeaturedProducts,
};
