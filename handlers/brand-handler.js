import Brand from "./../db/brand.js";

async function addBrand(model) {
  let brand = new Brand({
    name: model.name,
  });
  await brand.save();
  return brand.toObject();
}

async function getBrands() {
  let brands = await Brand.find();
  return brands.map((c) => c.toObject());
}

async function getBrandById(id) {
  let brand = await Brand.findById(id);
  return brand.toObject();
}

async function updateBrand(id, model) {
  await Brand.findOneAndUpdate({ _id: id }, model);
  return;
}

async function deleteBrand(id) {
  await Brand.findOneAndDelete({ _id: id });
  return;
}

export { addBrand, getBrands, getBrandById, updateBrand, deleteBrand };
