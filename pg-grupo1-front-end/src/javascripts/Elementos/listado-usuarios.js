import {
  iconos,
  datosUsuariosTabla,
  opcionesSelector,
} from "../configuracion/configuracion.js";
import {
  GetApi,
  PatchApi,
  DeleteApi,
  llamadasUrl,
} from "../configuracion/api.js";

import { mostrarDetalles } from "../Elementos/Detalles-usuario.js";
import { nuevoUsuario } from "./nuevo-usuario.js";
import { editarUsuario } from "./editar-usuario.js";

export function BorrarTabla() {
  const tabla = document.querySelector("#tabla");
  tabla.remove();
}

export function BorrarTodo() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}

export function cambiarFecha(fecha) {
  if (!fecha) return null;

  const [fechaFormateada] = fecha.split("T");
  const [año, mes, dia] = fechaFormateada.split("-");
  return `${dia}/${mes}/${año}`;
}

export function restaurarDatosUsuariosTabla(objeto) {
  objeto.indicepaginado = 0;
  objeto.inicioIdUsuarioMostrado = 0;
  objeto.valor = 5;
}

function crearDiv(clase) {
  const div = document.createElement("div");
  div.classList = clase;
  return div;
}

function crearH3(contenido) {
  const h3 = document.createElement("h3");
  h3.textContent = contenido;
  return h3;
}

function crearBoton(contenido) {
  const boton = document.createElement("button");
  boton.textContent = contenido;
  boton.id = "botonNuevoUsuario";
  return boton;
}

function crearTabla(clase) {
  const tabla = document.createElement("table");
  tabla.classList = clase;
  return tabla;
}

function crearFilaTablaEncabezado(clase) {
  const filaTablaEncabezado = document.createElement("tr");
  filaTablaEncabezado.classList = clase;
  return filaTablaEncabezado;
}

function crearFilaTabla(clase) {
  const filaTabla = document.createElement("tr");
  filaTabla.classList = clase;

  return filaTabla;
}

function crearCeldas(tipoCelda, contenido) {
  const celdas = document.createElement(tipoCelda);
  celdas.textContent = contenido;
  return celdas;
}

function crearCeldaUnida(contenido) {
  const celdaUnida = document.createElement("th");
  celdaUnida.textContent = contenido;
  celdaUnida.setAttribute("colspan", "3");
  return celdaUnida;
}

function crearCeldaIcono(url, alt) {
  const celdaIcono = document.createElement("td");
  const icono = document.createElement("img");
  icono.setAttribute("src", url);
  icono.setAttribute("alt", alt);
  celdaIcono.appendChild(icono);
  return celdaIcono;
}

function crearIcono(url, alt) {
  const flechas = document.createElement("img");
  flechas.classList = "icono-flecha";
  flechas.setAttribute("src", url);
  flechas.setAttribute("alt", alt);
  return flechas;
}

function crearSelector(opciones) {
  const selector = document.createElement("select");
  selector.id = "selector";
  opciones.forEach((element) => {
    selector.appendChild(crearOpcionSelector(element.valor));
  });

  return selector;
}
function crearOpcionSelector(valor) {
  const option = document.createElement("option");
  option.value = valor;
  option.textContent = valor;
  return option;
}

export function unirTabla() {
  const app = document.querySelector("#app");

  if (app) {
    const divContenido = crearDiv("contenido");
    divContenido.id = "contenido";
    app.appendChild(divContenido);

    const divDatos = crearDiv("datos-usuarios");
    divContenido.appendChild(divDatos);
    divDatos.appendChild(crearH3("Usuarios"));
    divDatos.appendChild(crearBoton("Nuevo usuario"));

    eventoNuevoUsuario();

    divContenido.appendChild(crearDiv("contorno-tabla"));

    return divContenido;
  }
}

export function crearTablaContenido(usuarios, iconos) {
  const app = document.querySelector("#app");
  if (app) {
    const divContorno = document.querySelector(".contorno-tabla");
    const tabla = crearTabla("tabla");
    tabla.id = "tabla";
    divContorno.appendChild(tabla);

    const filaEncabezado = crearFilaTablaEncabezado("fila-encabezado");
    tabla.appendChild(filaEncabezado);
    filaEncabezado.appendChild(crearCeldas("th", "Nombre"));
    filaEncabezado.appendChild(crearCeldas("th", "Apellidos"));

    filaEncabezado.appendChild(crearCeldas("th", "Email"));
    filaEncabezado.appendChild(crearCeldas("th", "Estado suscripción"));

    filaEncabezado.appendChild(crearCeldas("th", "Fin suscripción"));
    filaEncabezado.appendChild(crearCeldaUnida("Funciones"));

    if (datosUsuariosTabla.valor <= usuarios.length) {
      crearFilasTabla(
        tabla,
        usuarios,
        iconos,
        datosUsuariosTabla.inicioIdUsuarioMostrado,
        datosUsuariosTabla.valor
      );
    } else {
      crearFilasTabla(
        tabla,
        usuarios,
        iconos,
        datosUsuariosTabla.inicioIdUsuarioMostrado,
        usuarios.length
      );
    }

    return divContorno;
  }
}

export function crearFilasTabla(tabla, usuarios, iconos, inicio, limite) {
  for (let i = inicio; i < inicio + limite; i++) {
    if (i < usuarios.length) {
      const fila = crearFilaTabla("fila");

      fila.addEventListener("click", () => {
        const id = usuarios[i]._id;

        BorrarTodo();
        mostrarDetalles(id);
      });

      fila.appendChild(crearCeldas("td", usuarios[i].nombre));
      fila.appendChild(crearCeldas("td", usuarios[i].apellidos));
      fila.appendChild(crearCeldas("td", usuarios[i].email));
      let estado =
        usuarios[i].estadoSuscripcion === true ? "Activo" : "No activo";
      fila.appendChild(crearCeldas("td", estado));

      const fechaFin = cambiarFecha(usuarios[i].fechaFinSuscripcion);
      fila.appendChild(crearCeldas("td", fechaFin));

      const editar = crearCeldaIcono(iconos[0].url, iconos[0].alt);
      fila.appendChild(editar);
      editar.addEventListener("click", async (edit) => {
        edit.stopPropagation();
        BorrarTodo();
        llamadasUrl.id = usuarios[i]._id;
        const url =
          llamadasUrl.url + llamadasUrl.todosLosUsuarios + "/" + llamadasUrl.id;
        const token = localStorage.getItem("token");
        const data = await GetApi(url, token);
        editarUsuario(data);
        restaurarDatosUsuariosTabla(datosUsuariosTabla);
      });

      const eliminar = crearCeldaIcono(iconos[1].url, iconos[1].alt);
      fila.appendChild(eliminar);
      eliminar.addEventListener("click", (eli) => {
        eli.stopPropagation();

        llamadasUrl.id = "/" + usuarios[i]._id;

        const divConfirmacion = document.createElement("div");

        divConfirmacion.innerHTML = ` 
                <div class="" id="confirmacion">
                    <div class="contorno-confirmacion">
                        <h3 class="title-confirmacion">¿Está seguro de que desea eliminiar este usuario?</h3>
                        <div class="botones">
                            <button id="btnAceptar">Aceptar</button>
                            <button id="btnNoAceptar">Cancelar</button>
                        </div>
                    </div>
                </div>;
                `;

        const app = document.getElementById("app");
        const divContenido = document.getElementById("contenido");
        app.appendChild(divConfirmacion);

        const btnAceptar = document.getElementById("btnAceptar");
        const btnNoAceptar = document.getElementById("btnNoAceptar");

        btnAceptar.addEventListener("click", async () => {
          let urlBorrado =
            llamadasUrl.url + llamadasUrl.todosLosUsuarios + llamadasUrl.id;
          const token = localStorage.getItem("token");

          try {
            const response = await DeleteApi(urlBorrado, token);

            if (response.success) {
              divConfirmacion.remove();

              restaurarDatosUsuariosTabla(datosUsuariosTabla);
              divContenido.remove();
              await unirContenidoYTabla(iconos);
            } else {
              throw new Error(response.message);
            }
          } catch (error) {
            console.error("Error al borrar:", error.message);
          }
        });

        btnNoAceptar.addEventListener("click", () => {
          divConfirmacion.remove();
        });
      });

      const deshabilitar = crearCeldaIcono(iconos[2].url, iconos[2].alt);
      fila.appendChild(deshabilitar);
      deshabilitar.addEventListener("click", (desa) => {
        desa.stopPropagation();

        llamadasUrl.id = "/" + usuarios[i]._id;

        const divConfirmacion = document.createElement("div");

        divConfirmacion.innerHTML = ` 
          <div class="" id="confirmacion">
          <div class="contorno-confirmacion">
          <h3 class="title-confirmacion">¿Está seguro de que desea cambiar el estado de suscripción de este usuario?</h3>
          <div class="botones">
          <button id="btnAceptar">Aceptar</button>
          <button id="btnNoAceptar">Cancelar</button>
          </div>
          </div>
          </div>;
          `;

        const app = document.getElementById("app");
        const divContenido = document.getElementById("contenido");
        app.appendChild(divConfirmacion);

        const btnAceptar = document.getElementById("btnAceptar");
        const btnNoAceptar = document.getElementById("btnNoAceptar");

        btnAceptar.addEventListener("click", async () => {
          const data = {
            estadoSuscripcion: !usuarios[i].estadoSuscripcion,
          };
          let urlDesabilitado =
            llamadasUrl.url +
            llamadasUrl.todosLosUsuarios +
            llamadasUrl.id +
            "/deshabilitar";
          const token = localStorage.getItem("token");

          try {
            const response = await PatchApi(urlDesabilitado, data, token);

            if ((response.status = 200)) {
              divConfirmacion.remove();

              restaurarDatosUsuariosTabla(datosUsuariosTabla);
              divContenido.remove();
              await unirContenidoYTabla(iconos);
            } else {
              throw new Error(response.message);
            }
          } catch (error) {
            console.error("Error al desabilitar:", error.message);
          }
        });

        btnNoAceptar.addEventListener("click", () => {
          divConfirmacion.remove();
        });
      });

      tabla.appendChild(fila);
    }
  }
}

function crearDivFlechas(iconos) {
  const app = document.querySelector("#app");
  if (app) {
    const divFlechas = crearDiv("contenedor-flechas");
    const divContenido = document.querySelector(".contenido");
    divContenido.appendChild(divFlechas);
    divFlechas.appendChild(crearSelector(opcionesSelector));

    const flechaAnterior = crearIcono(iconos[3].url, iconos[3].alt);
    flechaAnterior.id = "flecha-anterior";
    divFlechas.appendChild(flechaAnterior);

    const flechaSiguiente = crearIcono(iconos[4].url, iconos[4].alt);
    flechaSiguiente.id = "flecha-siguiente";
    divFlechas.appendChild(flechaSiguiente);
  }
}

export async function unirContenidoYTabla(elemenIconos) {
  const app = document.querySelector("#app");
  if (app) {
    const url = llamadasUrl.url + llamadasUrl.todosLosUsuarios;
    const token = localStorage.getItem("token");
    const llamadaTodosUsuarios = await GetApi(url, token);

    unirTabla();
    crearTablaContenido(llamadaTodosUsuarios, elemenIconos);
    crearDivFlechas(elemenIconos);

    eventoSelector(llamadaTodosUsuarios);

    flechaAnterior(datosUsuariosTabla, llamadaTodosUsuarios);
    flechaSiguiente(datosUsuariosTabla, llamadaTodosUsuarios);
  }
}

function flechaAnterior(objetoTabla, usuario) {
  const flechaAnteriorEvento = document.querySelector("#flecha-anterior");
  flechaAnteriorEvento.addEventListener("click", () => {
    if (objetoTabla.indicepaginado > 0) {
      objetoTabla.indicepaginado = Math.max(objetoTabla.indicepaginado - 1, 0);
      objetoTabla.inicioIdUsuarioMostrado =
        objetoTabla.indicepaginado * objetoTabla.valor;

      BorrarTabla();
      crearTablaContenido(usuario, iconos);
    } else {
      alert("Estás en la primera página.");
    }
  });
}

function flechaSiguiente(objetoTabla, usuario) {
  const flechaSiguienteEvento = document.querySelector("#flecha-siguiente");
  flechaSiguienteEvento.addEventListener("click", () => {
    if (
      objetoTabla.inicioIdUsuarioMostrado + objetoTabla.valor <
      usuario.length
    ) {
      objetoTabla.indicepaginado = objetoTabla.indicepaginado + 1;
      objetoTabla.inicioIdUsuarioMostrado =
        objetoTabla.indicepaginado * objetoTabla.valor;

      BorrarTabla();
      crearTablaContenido(usuario, iconos);
    } else {
      alert("Estás en la última página.");
    }
  });
}

function eventoNuevoUsuario() {
  const botonNuevoUsuario = document.querySelector("#botonNuevoUsuario");

  botonNuevoUsuario.addEventListener("click", () => {
    BorrarTodo();
    nuevoUsuario();
  });
}
function eventoSelector(usuario) {
  const app = document.querySelector("#app");
  if (app) {
    const selector = document.querySelector("#selector");
    selector.addEventListener("change", () => {
      datosUsuariosTabla.valor = parseInt(selector.value, 10);
      datosUsuariosTabla.indicepaginado = 0;
      datosUsuariosTabla.inicioIdUsuarioMostrado = 0;

      BorrarTabla();
      crearTablaContenido(usuario, iconos);
    });
  }
}