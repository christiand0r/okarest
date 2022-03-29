const jwt = require("jsonwebtoken");
const { Customer } = require("../models");

const validateJWT = async (req, res, next) => {
  const token = req.header("oka-token");

  if (!token)
    return res.status(401).json({
      error: true,
      text: "No se ha encontrado el token en la petición",
    });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    //Get customer by uid
    const customer = await Customer.findById(uid);

    if (!customer)
      return res.status(401).json({
        error: true,
        text: "Token no válido, no se ha encontrado ningun cliente",
      });

    //Check if user state is true
    if (!customer.state)
      return res.status(401).json({
        error: true,
        text: "Token no válido, el cliente se encuentra eliminado/deshabilitado",
      });

    req.customer = customer;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: true,
      text: "Token no válido",
    });
  }
};

module.exports = validateJWT;
