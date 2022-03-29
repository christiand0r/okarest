const { check } = require("express-validator");

// Custom Middlewares
const validatorFields = require("./validatorFields");

const post = [
  check("email", "El email es obligatorio").isEmail(),
  check("password", "La contraseña es obligatoria").notEmpty(),
  validatorFields,
];

module.exports = {
  post,
};
