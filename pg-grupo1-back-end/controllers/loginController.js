const UsersModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generarToken } = require("../utils/utils");

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const user = await UsersModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send("Usuario o contraseña no válidos");
    }

    const validarContrasena = await bcrypt.compare(contraseña, user.contraseña);
    if (!validarContrasena) {
      return res.status(401).send("Usuario o contraseña no válidos");
    }

    const payload = {
      _id: user._id,
      nombre: user.nombre,
      rol: user.rol,
    };

    const token = generarToken(payload, false);
    const token_refresco = generarToken(payload, true);

    res.status(200).send({ user, token, token_refresco });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const tokenRefresco = (req, res) => {
  try {
    const payload = {
      _id: req.payload._id,
      nombre: req.payload.nombre,
      rol: req.payload.rol,
    };
    const token = generarToken(payload, false);
    const token_refresco = generarToken(payload, true);
    res.status(200).send({ token, token_refresco });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = { login, tokenRefresco };
