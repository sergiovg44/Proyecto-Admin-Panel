import { PatchApi, llamadasUrl } from "../configuracion/api";
import { iconos } from "../configuracion/configuracion";

import { BorrarTodo, unirContenidoYTabla } from "../Elementos/listado-usuarios";

import { crearFormulario } from "./nuevo-usuario";

export function editarUsuario(data) {
  crearFormulario();
  añadirValores(data);
  botones();
}

function añadirValores(data) {
  document.getElementById("nombre").value = data.nombre;
  document.getElementById("apellidos").value = data.apellidos;
  document.getElementById("fecha_nacimiento").value = data.fechaNacimiento;
  document.getElementById("formu-usuario").value = data.usuario;
  document.getElementById("movil").value = data.telefono;
  document.getElementById("codigo_postal").value = data.codigoPostal;
  document.getElementById("pais").value = data.pais;
  document.getElementById("provincia").value = data.provincia;
  document.getElementById("municipio").value = data.municipio;
  document.getElementById("direccion").value = data.direccion;
}
function botones() {
  const contenedor = document.querySelector(".contenedor-nuevousuario");
  const contenedorBotones = document.createElement("div");
  contenedorBotones.classList.add("contenedor-botones");
  const botonEditar = document.createElement("button");
  botonEditar.textContent = "Actualizar";
  botonEditar.id = "boton-editar";
  botonEditar.classList.add("btn-registro");

  contenedorBotones.appendChild(botonEditar);
  botonEditar.addEventListener("click", async () => {
    const data = {
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      fechaNacimiento: document.getElementById("fecha_nacimiento").value,
      usuario: document.getElementById("formu-usuario").value,
      telefono: document.getElementById("movil").value,
      codigoPostal: document.getElementById("codigo_postal").value,
      pais: document.getElementById("pais").value,
      provincia: document.getElementById("provincia").value,
      municipio: document.getElementById("municipio").value,
      direccion: document.getElementById("direccion").value,
    };

    if (!data.nombre || !data.usuario) {
      alert("Por favor, completa todos los campos obligatorios");
      return;
    } else {
      const token = localStorage.getItem("token");

      const url = llamadasUrl.url + "/users" + "/" + llamadasUrl.id + "/editar";
      const editar = await PatchApi(url, data, token);

      BorrarTodo();
      unirContenidoYTabla(iconos);
    }
  });
  const botonVolver = document.createElement("button");
  botonVolver.textContent = "Volver";
  botonVolver.id = "boton-volver";
  botonVolver.classList.add("btn-volver");
  contenedorBotones.appendChild(botonVolver);
  botonVolver.addEventListener("click", () => {
    BorrarTodo();
    unirContenidoYTabla(iconos);
  });
  contenedor.appendChild(contenedorBotones);
}
