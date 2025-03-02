const jwt = require("jsonwebtoken");

const generarToken = (payload, esTokenRefresco) => {
  if (esTokenRefresco) {
    return jwt.sign(payload, process.env.SECRET_TOKEN_REFRESH, {
      expiresIn: "60min",
    });
  }
  return jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "15min",
  });
};

module.exports = { generarToken };
