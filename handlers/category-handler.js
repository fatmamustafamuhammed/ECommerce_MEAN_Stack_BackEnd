import Category from "./../db/category.js";

async function addCategory(model) {
  let category = new Category({
    name: model.name,
  });
  await category.save();
  return category.toObject();
}

async function getCategories() {
  let categories = await Category.find();
  return categories.map((c) => c.toObject());
}

async function updateCategory(id, model) {
  await Category.findOneAndUpdate({ _id: id }, model);
  return;
}

async function deleteCategory(id) {
  await Category.findOneAndDelete({ _id: id });
  return;
}

export { addCategory, getCategories, updateCategory, deleteCategory };
