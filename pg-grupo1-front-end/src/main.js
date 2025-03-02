import "./javascripts/configuracion/admin-user.js";

import "./style.css";
import "./javascripts/Elementos/login.js";
import "./javascripts/funcionalidad-botones/buscarUsuarios.js";
import "./javascripts/funcionalidad-botones/mostrarUsuarios.js";

const esAdmin = window.location.pathname.endsWith("admin.html");

if (esAdmin) {
  const cierraSesionFooter = document.querySelector("#cerrar-sesion-footer");
  const cierraSesionHeader = document.querySelector("#cerrar-sesion-header");
  cierraSesionFooter.addEventListener("click", () => {

    window.location.href = "/index.html";
    localStorage.clear();
    localStorage.removeItem("token");
  });
  cierraSesionHeader.addEventListener("click", () => {

    window.location.href = "/index.html";
    localStorage.clear();
    localStorage.removeItem("token");
  });
}