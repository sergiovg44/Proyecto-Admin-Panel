import { GetApi, llamadasUrl } from "../configuracion/api";
import { iconos, datosUsuariosTabla } from "../configuracion/configuracion";
import {
  BorrarTabla,
  crearTablaContenido,
  restaurarDatosUsuariosTabla,
} from "../Elementos/listado-usuarios";

export async function buscarUsuarios(query = "") {
  const url = query
    ? `${llamadasUrl.url}/buscar?q=${query}`
    : llamadasUrl.url + llamadasUrl.todosLosUsuarios;
  const token = localStorage.getItem("token");
  const usuario = await GetApi(url, token);
  return usuario;
}

const buscarButton = document.getElementById("buscarButton");
if (buscarButton) {
  buscarButton.addEventListener("click", async () => {
    const rol = localStorage.getItem("rol");
    if (rol === "admin") {
      const buscarInput = document.getElementById("buscarInput");
      const query = buscarInput.value.trim();
      const usuario = await buscarUsuarios(query);
      BorrarTabla();
      restaurarDatosUsuariosTabla(datosUsuariosTabla);
      crearTablaContenido(usuario, iconos);
    } else {
      alert("No tienes permisos de administrador.");
    }
  });
}
