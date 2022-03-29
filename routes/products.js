const { Router } = require("express");

const { product_mw } = require("../middlewares");

const {
  newProduct,
  getAllProducts,
  getSpecificProduct,
  modifyProduct,
  deleteProduct,
} = require("../controllers/products.controller");

const router = Router();

// All products - public
router.get("/", product_mw.getAll, getAllProducts);

// Specific product - public
router.get("/:id", product_mw.getSpecific, getSpecificProduct);

// Add new product - private
router.post("/", product_mw.post, newProduct);

// Update product - private
router.put("/:id", product_mw.put, modifyProduct);

// Delete product - private
router.delete("/:id", product_mw.del, deleteProduct);

module.exports = router;
