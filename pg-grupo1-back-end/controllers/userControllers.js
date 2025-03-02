const UsersModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await UsersModel.find();
    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ status: "Failed", error: "Error al obtener las películas" });
  }
};

const getUser = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const users = await UsersModel.findById(usuarioId);
    if (!users) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener el usuario", error });
  }
};

const borrarUsuario = async (req, res) => {
  try {
    const idUser = req.params.id;
    const user = await UsersModel.findByIdAndDelete(idUser);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Se ha borrado correctamente" });
  } catch (error) {
    console.error("Error en el servidor:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      fechaNacimiento,
      usuario,
      email,
      contraseña,
      telefono,
      codigoPostal,
      pais,
      provincia,
      municipio,
      direccion,
      rol,
    } = req.body;

    const newUser = {
      nombre,
      apellidos,
      fechaNacimiento,
      usuario,
      email,
      contraseña: await bcrypt.hash(contraseña, 10),
      telefono,
      codigoPostal,
      pais,
      provincia,
      municipio,
      direccion,
      rol,
    };

    await UsersModel.create(newUser);
    res.status(200).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).send({ status: "failed", error: error.message });
    }
    res.status(500).send({ status: "failed", error: error.message });
  }
};

const deshabilitarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioActual = await UsersModel.findById(id);
    if (!usuarioActual) {
      return res.status(404).send("Usuario no encontrado");
    }

    const usuarioModificado = await UsersModel.findByIdAndUpdate(
      id,
      { estadoSuscripcion: !usuarioActual.estadoSuscripcion },
      { new: true }
    );

    res.status(200).send(usuarioModificado);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const editarUsuario = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const user = await UsersModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

const buscarUsuarios = async (req, res) => {
  const query = req.query.q;
  try {
    const users = await UsersModel.find({
      $or: [
        { nombre: { $regex: query, $options: "i" } },
        { apellidos: { $regex: query, $options: "i" } },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuarios" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  borrarUsuario,
  crearUsuario,
  deshabilitarUsuario,
  editarUsuario,
  buscarUsuarios,
};
