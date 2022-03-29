const { check, query } = require("express-validator");

// Custom Middlewares
const validateJWT = require("./validateJWT");
const validatorFields = require("./validatorFields");

// Helpers
const { existID } = require("../helpers/dbValidator");

// Model
const { Product } = require("../models");

const getAll = [
  query("page", "El parámetro page debe ser un número").isInt().optional(),
  query("per_page", "El parámetro per_page debe ser un número")
    .isInt()
    .optional(),
  validatorFields,
];

const getSpecific = [
  check("id", "El ID indicado no es válido").isUUID("4"),
  check("id").custom((id) => existID(id, Product)),
  validatorFields,
];

const post = [
  validateJWT,
  check("name", "El producto debe tener un nombre").isString().notEmpty(),
  check("price", "El producto debe tener un precio").notEmpty(),
  check("price", "El precio debe ser un número").isNumeric(),
  check("description")
    .isString()
    .optional()
    .withMessage("La descripción del producto solo acepta texto"),

  //TODO check owner
  validatorFields,
];

const put = [
  //JWT
  validateJWT,
  //ID
  check("id", "El ID indicado no es válido").isUUID("4"),
  check("id").custom((id) => existID(id, Product)),
  //Name
  check("name", "El nombre no es válido")
    .isString()
    .trim()
    .notEmpty()
    .optional(),
  //Description
  check("description", "El nombre no es válido")
    .isString()
    .trim()
    .notEmpty()
    .optional(),
  //Price
  check("price", "El precio no es válido"),
];

const del = [
  validateJWT,
  check("id", "El ID indicado no es válido").isUUID("4"),
  check("id").custom((id) => existID(id, Product)),
  validatorFields,
];

module.exports = {
  getAll,
  getSpecific,
  post,
  put,
  del,
};
