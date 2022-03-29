const { request, response, json } = require("express");

const paginate = require("../helpers/paginate");

const { Product } = require("../models");

const getSpecificProduct = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id).populate("owner", "name");

    res.json(product);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllProducts = async (req = request, res = response) => {
  const { from, page, perPage } = paginate(req.query);

  // Filter documents and get state:true
  const query = { state: true };

  try {
    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).populate("owner", "name").skip(from).limit(perPage),
    ]);

    res.json({
      total,
      page,
      perPage,
      lastPage: Math.ceil(total < 1 ? 1 : total / perPage),
      products,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const newProduct = async (req = request, res = response) => {
  let { price, ...data } = req.body;

  //Add Owner's ID
  const owner = req.customer._id;

  if (Number.isInteger(price)) {
    price = Number(price).toFixed(2);
  }

  try {
    const product = await new Product({
      ...data,
      price: parseFloat(price),
      owner,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const modifyProduct = async (req = request, res = response) => {
  // Extract segment variable
  const productID = req.params.id;

  // Extract needed values in _customer
  const { _id, state, owner, ..._product } = req.body;

  try {
    let product = await Product.findById(productID);

    if (product.owner !== req.customer._id)
      return res.status(400).json({
        error: true,
        text: "Para modificar un articulo debe ser el dueño",
      });

    product = await Product.findByIdAndUpdate(productID, _product, {
      new: true,
    });

    res.json({ product });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    let product = await Product.findById(id);

    if (product.owner !== req.customer._id)
      return res.status(400).json({
        error: true,
        text: "Para modificar un articulo debe ser el dueño",
      });

    product = await Product.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );

    res.json({ product });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  newProduct,
  getSpecificProduct,
  getAllProducts,
  modifyProduct,
  deleteProduct,
};
