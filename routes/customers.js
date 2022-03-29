const { Router } = require("express");

const { customer_mw } = require("../middlewares");

const {
  customerGet,
  customersGet,
  customerPost,
  customerPut,
  customerDelete,
} = require("../controllers/customers.controller");

const router = Router();

//All users (Plural!!!)
router.get("/", customer_mw.getAll, customersGet);

//Specific user
router.get("/:id", customer_mw.getSpecific, customerGet);

router.post("/", customer_mw.post, customerPost);

router.put("/:id", customer_mw.put, customerPut);

router.delete("/:id", customer_mw.del, customerDelete);

module.exports = router;
