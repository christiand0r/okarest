const { request, response } = require("express");
const { compareSync } = require("bcryptjs");

const { generateJWT } = require("../helpers/generateJWT");

const { Customer } = require("../models");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //Check if email exist
    const customer = await Customer.findOne({ email });

    if (!customer)
      return res.status(400).json({
        error: true,
        text: "El email ingresado no existe",
      });

    //Check if user is active
    if (!customer.state)
      return res.status(400).json({
        error: true,
        text: "El cliente se encuentra deshabilitado o eliminado",
      });

    //Validate password
    const validatePassword = compareSync(password, customer.password);

    if (!validatePassword)
      return res.status(400).json({
        error: true,
        text: "Contraseña incorrecta",
      });

    const token = await generateJWT(customer.id);

    res.json({ customer, token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  login,
};
