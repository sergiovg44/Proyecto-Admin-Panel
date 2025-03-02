//Aqui ponemos todas las rutas para hacer las peticiones

const express = require("express");
const { verificarAdmin, verificarToken } = require("../middlewares/auth.js");

const router = express.Router();

const {
  getAllUsers,
  borrarUsuario,
  getUser,
  crearUsuario,
  deshabilitarUsuario,
  editarUsuario, buscarUsuarios
} = require("../controllers/userControllers.js");
router.get("/users", verificarToken, verificarAdmin, getAllUsers);
router.get("/users/:id", verificarToken, getUser);
router.delete("/users/:id", verificarToken, verificarAdmin, borrarUsuario);
router.post("/create", verificarToken, verificarAdmin, crearUsuario);
router.get('/buscar', verificarToken, verificarAdmin, buscarUsuarios);
router.patch("/users/:id/deshabilitar", verificarToken, verificarAdmin, deshabilitarUsuario);
router.patch("/users/:id/editar", verificarToken, verificarAdmin, editarUsuario);

module.exports = router;
