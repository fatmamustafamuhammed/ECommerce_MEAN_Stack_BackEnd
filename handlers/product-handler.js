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

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
