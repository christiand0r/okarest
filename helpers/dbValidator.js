const { Customer, Product } = require("../models");
const isEqual = require("./isEqual");

const isEmailRegistered = async (email = "") => {
  const findEmail = await Customer.findOne({ email });

  if (findEmail) throw new Error("El email ya está registrado");
};

// Check ID's ids according to model
const existID = async (id = "", model) => {
  const findCustomer = await model.findById(id);

  if (!findCustomer) throw new Error(`El ID: '${id}', no existe`);
};

//Check if ID's in products array are valid
const existProducts = async (products = []) => {
  const productsID = products.map((product) => product.id);

  const productsList = await (
    await Product.find({ _id: { $in: productsID } }).lean()
  ).reverse();

  if (productsList.length === 0)
    throw productsID.length > 1
      ? new Error("Los productos indicados no existen")
      : new Error("El producto indicado no existe");

  //The third parameter is "id" because in the model change name
  const invalidProducts = isEqual(productsID, productsList, "_id");

  if (invalidProducts.length === 1)
    throw new Error(
      `El producto con ID: '${invalidProducts.join(", ")}', no existe`
    );

  if (invalidProducts.length > 1)
    throw new Error(
      `Los productos con ID: '${invalidProducts.join(", ")}', no existen`
    );
};

module.exports = {
  isEmailRegistered,
  existID,
  existProducts,
};
