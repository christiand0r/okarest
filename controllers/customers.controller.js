const { request, response } = require("express");
const { genSaltSync, hashSync } = require("bcryptjs");

const Paginate = require("../helpers/paginate");

const { Customer } = require("../models");

const customerGet = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const customer = await Customer.findById(id);

    res.json(customer);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const customersGet = async (req = request, res = response) => {
  const { from, page, perPage } = Paginate(req.query);

  // Filter documents and get state:true
  const query = { state: true };

  try {
    const [total, customers] = await Promise.all([
      Customer.countDocuments(query),
      Customer.find(query).skip(from).limit(perPage),
    ]);

    res.json({
      total,
      page,
      perPage,
      lastPage: Math.ceil(total < 1 ? 1 : total / perPage),
      customers,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const customerPost = async (req = request, res = response) => {
  const { _id, state, ..._customer } = req.body;

  //Hash password
  const salt = genSaltSync(10);
  _customer.password = hashSync(_customer.password, salt);

  const customer = new Customer(_customer);

  try {
    //Save customer
    await customer.save();

    return res.status(201).json({ customer });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error,
    });
  }
};

const customerPut = async (req = request, res = response) => {
  // Extract segment variable
  const customerID = req.params.id;

  // Extract needed values in _customer
  const { _id, state, password, ..._customer } = req.body;

  if (customerID !== req.customer._id)
    return res.status(400).json({
      error: true,
      text: "No puede modificar un perfil sin ser dueño",
    });

  if (password) {
    const salt = genSaltSync(10);
    _customer.password = hashSync(password, salt);
  }

  try {
    const customer = await Customer.findByIdAndUpdate(customerID, _customer, {
      new: true,
    });

    res.json({ customer });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const customerDelete = async (req = request, res = response) => {
  const { id } = req.params;

  if (id !== req.customer._id)
    return res.status(400).json({
      error: true,
      text: "No puede eliminar un perfil diferente del suyo",
    });

  try {
    const customer = await Customer.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );

    res.json({ customer });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = {
  customerGet,
  customersGet,
  customerPost,
  customerPut,
  customerDelete,
};
