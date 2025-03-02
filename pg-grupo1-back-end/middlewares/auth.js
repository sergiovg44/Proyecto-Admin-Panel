const jwt = require("jsonwebtoken");

const verificarToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acceso denegado");
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.payload = payload;
    next();
  } catch (error) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_TOKEN_REFRESH);
      req.payload = payload;
      next();
    } catch (error) {
      res.status(400).send("Token caducado o no valido");
    }
  }
};

const verificarAdmin = async (req, res, next) => {
  try {
    const payload = req.payload;
    if (!payload || !payload.rol)
      return res
        .status(400)
        .send("Token inválido o no autorizado", error.message);

    if (payload.rol !== "admin") {
      return res.status(401).send("No tienes permisos de administrador");
    }
    next();
  } catch (error) {
    res.status(400).send("Token caducado o no valido");
  }
};

module.exports = { verificarToken, verificarAdmin };
