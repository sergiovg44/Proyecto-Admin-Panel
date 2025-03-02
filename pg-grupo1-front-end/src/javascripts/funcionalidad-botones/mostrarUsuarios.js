import { datosUsuariosTabla, iconos } from "../configuracion/configuracion";
import {
  BorrarTodo,
  restaurarDatosUsuariosTabla,
  unirContenidoYTabla,
} from "../Elementos/listado-usuarios";

const mostrarButton = document.getElementById("mostrarButton");
if (mostrarButton) {
  mostrarButton.addEventListener("click", () => {
    const rol = localStorage.getItem("rol");
    if (rol === "admin") {
      BorrarTodo();
      restaurarDatosUsuariosTabla(datosUsuariosTabla);
      unirContenidoYTabla(iconos);
    } else {
      alert("No tienes permisos de administrador.");
    }
  });
}
