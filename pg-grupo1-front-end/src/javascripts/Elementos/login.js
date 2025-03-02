import "../configuracion/api";
import { API_URL_LOGIN } from "../configuracion/api";

const mensajeError = document.querySelector("#mensaje-error");
const emailInput = document.querySelector("#email-input");
const contrasenaInput = document.querySelector("#contrasena-input");

const getLoginFormErrors = (email, contrasena) => {
  const errores = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errores.push("El email es obligatorio.");
  } else if (!emailRegex.test(email)) {
    n;
    errores.push("Introduce una dirección de email válida.");
  }

  if (!contrasena) errores.push("La contraseña es obligatoria.");
  return errores;
};

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formulario");
  if (formulario) {
    formulario.addEventListener("submit", async (e) => {
      e.preventDefault();

      const errores = getLoginFormErrors(
        emailInput.value,
        contrasenaInput.value
      );
      if (errores.length > 0) {
        mensajeError.textContent = errores.join(" ");
        return;
      }

      try {
        const response = await fetch(`${API_URL_LOGIN}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailInput.value,
            contraseña: contrasenaInput.value,
          }),
        });

        if (!response.ok) {
          mensajeError.textContent =
            "El usuario o la contraseña son incorrectos.";
          return;
        }

        const { user, token, token_refresco } = await response.json();

        localStorage.setItem("id", user._id);
        localStorage.setItem("token", token);
        localStorage.setItem("token_refresco", token_refresco);
        localStorage.setItem("rol", user.rol);

        if (user.rol === "admin" || user.rol === "user") {
          window.location.href = "/admin.html";
        } else {
          mensajeError.textContent = "No tienes permisos.";
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        mensajeError.textContent =
          "Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.";
      }
    });
  }
});
