const express = require("express");
const { login, tokenRefresco } = require("../controllers/loginController");
const { verificarToken } = require("../middlewares/auth");
const router = express.Router();

router.post("/login", login);

router.get("/token-refresco", verificarToken, tokenRefresco);

module.exports = router;
