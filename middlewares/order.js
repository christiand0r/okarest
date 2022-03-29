const { check, query } = require("express-validator");
const { existProducts, existID } = require("../helpers/dbValidator");

// Custom Middlewares
const validateJWT = require("./validateJWT");
const validatorFields = require("./validatorFields");

// Model
const { Order } = require("../models");

const getAll = [
  query("page", "El parámetro page debe ser un número").isInt().optional(),
  query("per_page", "El parámetro per_page debe ser un número")
    .isInt()
    .optional(),
  validatorFields,
];

const getSpecific = [
  check("id", "El ID indicado no es válido").isUUID("4"),
  check("id").custom((id) => existID(id, Order)),
  validatorFields,
];

const post = [
  validateJWT,
  check(
    "products",
    "Debe indicar los productos en formato de arreglo"
  ).isArray(),
  check("products.*.id")
    .isUUID("4")
    .withMessage("Algún producto no posee una ID válida"),
  check("products").custom(existProducts),
  validatorFields,
];

const put = [
  validateJWT,
  check("id", "El ID indicado no es válido").isUUID("4"),
  check("id").custom((id) => existID(id, Order)),
  check("completed").isBoolean(),
];

const del = [
  validateJWT,
  check("id", "El ID indicado no es válido").isUUID("4"),
  check("id").custom((id) => existID(id, Order)),
  validatorFields,
];

module.exports = {
  getAll,
  getSpecific,
  post,
  put,
  del,
};
