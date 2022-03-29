const { Router } = require("express");
const { login_mw } = require("../middlewares");

const { login } = require("../controllers/login.controller");

const router = Router();

router.post("/", login_mw.post, login);

module.exports = router;
