import Category from "./../db/category.js";

async function addCategory(model) {
  let category = new Category({
    name: model.name,
  });
  await category.save();
  return category.toObject();
}

async function updateCategory(id, model) {
  await Category.findOneAndUpdate({ _id: id }, model);
  return;
}

async function deleteCategory(id) {
  await Category.findOneAndDelete({ _id: id });
  return;
}

export { addCategory, updateCategory, deleteCategory };
