const { Router } = require("express");
const {
  completeOrder,
  createOrder,
  deleteOrder,
  getAllOrders,
  getSpecificOrder,
} = require("../controllers/orders.controller");
const { order_mw } = require("../middlewares");

const router = Router();

router.get("/", order_mw.getAll, getAllOrders);

router.get("/:id", order_mw.getSpecific, getSpecificOrder);

router.post("/", order_mw.post, createOrder);

router.put("/:id", order_mw.put, completeOrder);

router.delete("/:id", order_mw.del, deleteOrder);

module.exports = router;
