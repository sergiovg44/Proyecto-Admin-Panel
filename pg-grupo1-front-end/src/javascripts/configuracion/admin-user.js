import { unirContenidoYTabla } from "../Elementos/listado-usuarios";
import { mostrarDetalles } from "../Elementos/Detalles-usuario";
import { iconos } from "./configuracion";

export function userVsAdmin() {document.addEventListener("DOMContentLoaded", () => {
    const id = localStorage.getItem("id")
    const rol = localStorage.getItem("rol");

    if (rol === "admin") {
        unirContenidoYTabla(iconos);
    } else if (rol === "user") {
        mostrarDetalles(id);
    }
});}

userVsAdmin()