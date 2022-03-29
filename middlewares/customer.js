const { check, query } = require("express-validator");

// Custom Middlewares
const validateJWT = require("./validateJWT");
const validatorFields = require("./validatorFields");

// Helpers
const { isEmailRegistered, existID } = require("../helpers/dbValidator");

//Model
const { Customer } = require("../models");

const getAll = [
  query("page", "El parámetro page debe ser un número").isInt().optional(),
  query("per_page", "El parámetro per_page debe ser un número")
    .isInt()
    .optional(),
  validatorFields,
];

const getSpecific = [
  check("id", "El ID indicado no es válido").isUUID("4"),
  check("id").custom((id) => existID(id, Customer)),
  validatorFields,
];

const post = [
  //Sanitization
  check(["name", "email", "password", "phone"]).trim(),
  //Name
  check("name", "El nombre no es válido").isString().notEmpty(),
  //Email
  check("email", "El correo no es válido").isEmail(),
  check("email").custom(isEmailRegistered),
  //Password
  check("password", "Debe indicar una contraseña").isString().notEmpty(),
  check("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña debe tener 8 carácteres entre: números, letras y un carácter especial"
    ),
  //Phone
  check("phone", "El teléfono no es válido")
    .isMobilePhone("any", {
      strictMode: true,
    })
    .notEmpty(),
  //Validator
  validatorFields,
];

const put = [
  //JWT
  validateJWT,
  //ID
  check("id", "El ID indicado no es válido").isUUID("4"),
  check("id").custom((id) => existID(id, Customer)),
  //Name
  check("name", "El nombre no es válido")
    .isString()
    .trim()
    .notEmpty()
    .optional(),
  //Email
  check("email", "El email no es válido").isEmail().trim().optional(),
  //Password
  check("password", "Debe indicar una contraseña")
    .isString()
    .trim()
    .notEmpty()
    .optional(),
  check("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 1,
    })
    .optional()
    .withMessage(
      "La contraseña debe tener 8 carácteres entre: números, letras y un carácter especial"
    ),
  //Phone
  check("phone", "El teléfono no es válido")
    .isMobilePhone("any", {
      strictMode: true,
    })
    .notEmpty()
    .optional(),
  //Validator
  validatorFields,
];

const del = [
  validateJWT,
  check("id", "El ID indicado no es válido").isUUID("4"),
  check("id").custom((id) => existID(id, Customer)),
  validatorFields,
];

module.exports = {
  getAll,
  getSpecific,
  post,
  put,
  del,
};
