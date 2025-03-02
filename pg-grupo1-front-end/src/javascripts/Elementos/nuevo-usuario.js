import { PostApi, llamadasUrl } from "../configuracion/api";
import { iconos, datosUsuariosTabla } from "../configuracion/configuracion";

import {
  BorrarTodo,
  unirContenidoYTabla,
  restaurarDatosUsuariosTabla,
} from "../Elementos/listado-usuarios";

export function nuevoUsuario() {
  crearFormulario();
  llamadapost();
}

export function crearFormulario() {
  const app = document.querySelector("#app");
  const contenedor = document.createElement("div");
  contenedor.className = "contenedor-nuevousuario";
  app.appendChild(contenedor);

  const titulo = document.createElement("h2");
  titulo.textContent = "Registro de Usuario";
  titulo.className = "h2-nuevousuario";
  contenedor.appendChild(titulo);

  const lista = document.createElement("form");
  lista.className = "horizontal";
  contenedor.appendChild(lista);

  const campos = [
    { label: "Nombre", type: "text", id: "nombre" },
    { label: "Apellidos", type: "text", id: "apellidos" },
    { label: "Fecha de nacimiento", type: "text", id: "fecha_nacimiento" },
    { label: "Usuario", type: "text", id: "formu-usuario" },
    { label: "Email", type: "email", id: "email" },
    { label: "Contraseña", type: "password", id: "contraseña" },
    { label: "Movil", type: "tel", id: "movil" },
    { label: "Codigo postal", type: "text", id: "codigo_postal" },
    { label: "Pais", type: "text", id: "pais" },
    { label: "Provincia", type: "text", id: "provincia" },
    { label: "Municipio", type: "text", id: "municipio" },
    { label: "Dirección", type: "text", id: "direccion" },
  ];

  campos.forEach(function (campo) {
    const crearCampo = document.createElement("div");
    crearCampo.className = "Crear-campo";

    const etiqueta = document.createElement("label");
    etiqueta.textContent = campo.label;
    etiqueta.htmlFor = campo.id;

    const entrada = document.createElement("input");
    entrada.type = campo.type;
    entrada.id = campo.id;
    entrada.name = campo.id;
    entrada.className = "input-nuevo";

    crearCampo.appendChild(etiqueta);
    crearCampo.appendChild(entrada);
    lista.appendChild(crearCampo);
  });
}
function llamadapost() {
  const contenedorBotones = document.createElement("div");
  contenedorBotones.classList.add("contenedor-botones");

  const boton = document.createElement("button");
  const contenedor = document.querySelector(".contenedor-nuevousuario");
  boton.type = "submit";
  boton.textContent = "Registrar";
  boton.id = "registro-usuario";
  contenedorBotones.appendChild(boton);
  const botonVolver = document.createElement("button");
  botonVolver.textContent = "Volver";
  boton.classList.add("btn-registro");
  botonVolver.classList.add("btn-volver");
  botonVolver.id = "boton-volver";
  contenedorBotones.appendChild(botonVolver);
  botonVolver.addEventListener("click", () => {
    BorrarTodo();
    unirContenidoYTabla(iconos);
  });
  contenedor.appendChild(contenedorBotones);
  boton.addEventListener("click", async (e) => {
    e.preventDefault();

    const data = {
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      fechaNacimiento: document.getElementById("fecha_nacimiento").value,
      usuario: document.getElementById("formu-usuario").value,
      email: document.getElementById("email").value,
      contraseña: document.getElementById("contraseña").value,
      telefono: document.getElementById("movil").value,
      codigoPostal: document.getElementById("codigo_postal").value,
      pais: document.getElementById("pais").value,
      provincia: document.getElementById("provincia").value,
      municipio: document.getElementById("municipio").value,
      direccion: document.getElementById("direccion").value,
    };

    if (!data.nombre || !data.email || !data.usuario || !data.contraseña) {
      alert("Por favor, completa todos los campos obligatorios");
      return;
    } else {
      const token = localStorage.getItem("token");
      const url = llamadasUrl.url + llamadasUrl.registro;
      const crear = PostApi(url, data, token);

      BorrarTodo();
      restaurarDatosUsuariosTabla(datosUsuariosTabla);
      unirContenidoYTabla(iconos);
    }
  });
}
