const { request, response } = require("express");

//Helpers
const paginate = require("../helpers/paginate");

// Model
const { Order } = require("../models");

const getSpecificOrder = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);

    res.json(order);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllOrders = async (req = request, res = response) => {
  const { from, page, perPage } = paginate(req.query);

  // Filter documents and get state:true
  const query = { state: true };

  try {
    const [total, orders] = await Promise.all([
      Order.countDocuments(query),
      Order.find(query).skip(from).limit(perPage),
    ]);

    res.json({
      total,
      page,
      perPage,
      lastPage: Math.ceil(total < 1 ? 1 : total / perPage),
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const createOrder = async (req = request, res = response) => {
  const { products } = req.body;

  //Normalize Product
  const productsNormalized = products.map(({ id, name, price, owner }) => ({
    id,
    name,
    price,
    owner,
  }));

  //Calculate total
  const prices = products.map((product) => product.price);
  const total = Number(
    prices.reduce((total, amount) => (total += amount))
  ).toFixed(2);

  const order = new Order({
    total: parseFloat(total),
    customer_id: req.customer._id,
    customer: { ...req.customer },
    products: productsNormalized,
  });

  try {
    await order.save();
    res.status(201).json({ order });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const completeOrder = async (req = request, res = response) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    let order = await Order.findById(id);

    if (order.customer_id !== req.customer._id)
      return res.status(400).json({
        error: true,
        text: "Para modificar una orden debe ser el que la solicito",
      });

    order = await Order.findByIdAndUpdate(id, { completed }, { new: true });

    res.json({ order });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteOrder = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    let order = await Order.findById(id);

    if (order.customer_id !== req.customer._id)
      return res.status(400).json({
        error: true,
        text: "Para elimnar una orden debe ser que la solicito",
      });

    order = await Order.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json({ order });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getSpecificOrder,
  getAllOrders,
  createOrder,
  completeOrder,
  deleteOrder,
};
