import { GetApi, irAlLogin, llamadasUrl } from "../configuracion/api.js";

import { iconos } from "../configuracion/configuracion.js";

import {
  unirContenidoYTabla,
  cambiarFecha,
} from "../Elementos/listado-usuarios.js";

export async function mostrarDetalles(id) {
  let contenido = document.getElementById("app");

  const url = llamadasUrl.url + llamadasUrl.todosLosUsuarios + "/" + id;
  const token = localStorage.getItem("token");
  const u = await GetApi(url, token);

  let head = document.getElementsByTagName("head")[0];
  let tabla = document.createElement("table");
  let detalleUsuario = document.createElement("h2");
  let fila1 = document.createElement("tr");
  let fila2 = document.createElement("tr");
  let fila3 = document.createElement("tr");
  let fila4 = document.createElement("tr");
  let fila5 = document.createElement("tr");
  let fila6 = document.createElement("tr");
  let fila7 = document.createElement("tr");
  let fila8 = document.createElement("tr");
  let fila9 = document.createElement("tr");
  let fila10 = document.createElement("tr");
  let fila11 = document.createElement("tr");
  let fila12 = document.createElement("tr");
  let nombre = document.createElement("td");
  let contenidoNombre = document.createElement("td");
  let apellidos = document.createElement("td");
  let contenidoApellidos = document.createElement("td");
  let fNacimiento = document.createElement("td");
  let contenidoFNacimiento = document.createElement("td");
  let usuario = document.createElement("td");
  let contenidoUsuario = document.createElement("td");
  let email = document.createElement("td");
  let contenidoEmail = document.createElement("td");

  let pais = document.createElement("td");
  let contenidoPais = document.createElement("td");
  let provincia = document.createElement("td");
  let contenidoProvincia = document.createElement("td");
  let municipio = document.createElement("td");
  let contenidoMunicipio = document.createElement("td");
  let telefono = document.createElement("td");
  let contenidoTelefono = document.createElement("td");
  let direccion = document.createElement("td");
  let contenidoDireccion = document.createElement("td");
  let cPostal = document.createElement("td");
  let contenidoCPostal = document.createElement("td");
  let fSuscripcion = document.createElement("td");
  let contenidoFSuscripcion = document.createElement("td");

  let estilo = document.createElement("link");
  estilo.setAttribute("rel", "stylesheet");
  estilo.setAttribute("href", "style/style.css");
  head.appendChild(estilo);

  tabla.setAttribute("class", "tabla-detalle");
  nombre.classList.add("td-titulo");
  apellidos.classList.add("td-titulo");
  fNacimiento.classList.add("td-titulo");
  usuario.classList.add("td-titulo");
  email.classList.add("td-titulo");
  pais.classList.add("td-titulo");
  provincia.classList.add("td-titulo");
  municipio.classList.add("td-titulo");
  telefono.classList.add("td-titulo");
  direccion.classList.add("td-titulo");
  cPostal.classList.add("td-titulo");
  fSuscripcion.classList.add("td-titulo");

  detalleUsuario.textContent = "Detalles de usuario";
  nombre.textContent = "Nombre:";
  contenidoNombre.textContent = u.nombre;
  apellidos.textContent = "Apellidos:";
  contenidoApellidos.textContent = u.apellidos;
  fNacimiento.textContent = "Fecha de nacimiento:";
  contenidoFNacimiento.textContent = u.fechaNacimiento;
  usuario.textContent = "Usuario:";
  contenidoUsuario.textContent = u.usuario;
  email.textContent = "Email:";
  contenidoEmail.textContent = u.email;

  pais.textContent = "País:";
  contenidoPais.textContent = u.pais;
  provincia.textContent = "Provincia:";
  contenidoProvincia.textContent = u.provincia;
  municipio.textContent = "Municipio:";
  contenidoMunicipio.textContent = u.municipio;
  telefono.textContent = "Teléfono:";
  contenidoTelefono.textContent = u.telefono;
  direccion.textContent = "Dirección:";
  contenidoDireccion.textContent = u.direccion;
  cPostal.textContent = "Código postal:";
  contenidoCPostal.textContent = u.codigoPostal;
  fSuscripcion.textContent = "Finalización de suscripción:";

  contenidoFSuscripcion.textContent = cambiarFecha(u.fechaFinSuscripcion);

  fila1.appendChild(nombre);
  fila1.appendChild(contenidoNombre);
  fila2.appendChild(apellidos);
  fila2.appendChild(contenidoApellidos);
  fila3.appendChild(fNacimiento);
  fila3.appendChild(contenidoFNacimiento);
  fila4.appendChild(usuario);
  fila4.appendChild(contenidoUsuario);
  fila5.appendChild(email);
  fila5.appendChild(contenidoEmail);

  fila6.appendChild(pais);
  fila6.appendChild(contenidoPais);
  fila7.appendChild(provincia);
  fila7.appendChild(contenidoProvincia);
  fila8.appendChild(municipio);
  fila8.appendChild(contenidoMunicipio);
  fila9.appendChild(telefono);
  fila9.appendChild(contenidoTelefono);
  fila10.appendChild(direccion);
  fila10.appendChild(contenidoDireccion);
  fila11.appendChild(cPostal);
  fila11.appendChild(contenidoCPostal);
  fila12.appendChild(fSuscripcion);
  fila12.appendChild(contenidoFSuscripcion);

  let botonVolver = document.createElement("a");

  botonVolver.setAttribute("class", "boton-volver");
  botonVolver.textContent = "Volver";
  botonVolver.addEventListener("click", () => {
    const rol = localStorage.getItem("rol");
    if (rol === "admin") {
      contenido.innerHTML = "";
      unirContenidoYTabla(iconos);
    } else {
      localStorage.clear();
      irAlLogin();
    }
  });

  tabla.appendChild(fila1);
  tabla.appendChild(fila2);
  tabla.appendChild(fila3);
  tabla.appendChild(fila4);
  tabla.appendChild(fila5);
  tabla.appendChild(fila6);
  tabla.appendChild(fila7);
  tabla.appendChild(fila8);
  tabla.appendChild(fila9);
  tabla.appendChild(fila10);
  tabla.appendChild(fila11);
  tabla.appendChild(fila12);

  if (contenido) {
    contenido.appendChild(detalleUsuario);
    contenido.appendChild(tabla);
    contenido.appendChild(botonVolver);
  }
}
