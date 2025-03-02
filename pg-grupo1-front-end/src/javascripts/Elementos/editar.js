export function mostrarFormularioEdicion(usuario) {
    formularioEdicion.innerHTML = `
        <h2>Editar Usuario</h2>
        <form id="formEditarUsuario">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" value="${usuario.nombre}" required>
            <br>
            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" value="${usuario.apellidos}" required>
            <br>
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" value="${usuario.email}" required>
            <br>
            <label for="fechaNacimiento">Fecha de Nacimiento:</label>
            <input type="date" id="fechaNacimiento" value="${usuario.fechaNacimiento.split('T')[0]}" required>
            <br>
            <label for="usuario">Usuario:</label>
            <input type="text" id="usuario" value="${usuario.usuario}" required>
            <br>
            <label for="telefono">Teléfono:</label>
            <input type="number" id="telefono" value="${usuario.telefono}" required>
            <br>
            <label for="codigoPostal">Código Postal:</label>
            <input type="text" id="codigoPostal" value="${usuario.codigoPostal}" required>
            <br>
            <label for="pais">País:</label>
            <input type="text" id="pais" value="${usuario.pais}" required>
            <br>
            <label for="provincia">Provincia:</label>
            <input type="text" id="provincia" value="${usuario.provincia}" required>
            <br>
            <label for="municipio">Municipio:</label>
            <input type="text" id="municipio" value="${usuario.municipio}" required>
            <br>
            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" value="${usuario.direccion}" required>
            <br>
            <label for="fechaInicioSuscripcion">Fecha Inicio Suscripción:</label>
            <input type="date" id="fechaInicioSuscripcion" value="${usuario.fechaInicioSuscripcion.split('T')[0]}" required>
            <br>
            <label for="fechaFinSuscripcion">Fecha Fin Suscripción:</label>
            <input type="date" id="fechaFinSuscripcion" value="${usuario.fechaFinSuscripcion.split('T')[0]}" required>
            <br>
            <button type="submit">Guardar Cambios</button>
        </form>
    `;

}
export async function editarUsuario(id) {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const usuario = document.getElementById('usuario').value;
    const telefono = document.getElementById('telefono').value;
    const codigoPostal = document.getElementById('codigoPostal').value;
    const pais = document.getElementById('pais').value;
    const provincia = document.getElementById('provincia').value;
    const municipio = document.getElementById('municipio').value;
    const direccion = document.getElementById('direccion').value;
    const fechaInicioSuscripcion = document.getElementById('fechaInicioSuscripcion').value;
    const fechaFinSuscripcion = document.getElementById('fechaFinSuscripcion').value;

    const response = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellidos, email, fechaNacimiento, usuario, telefono, codigoPostal, pais, provincia, municipio, direccion, fechaInicioSuscripcion, fechaFinSuscripcion })
    });

    if (response.ok) {
        mensaje.textContent = 'Los cambios se han guardado correctamente.';
        mensaje.className = 'mensaje-confirmacion';
        mostrarUsuarios(await fetchUsuarios());
        formularioEdicion.innerHTML = '';
    } else {
        const resultado = await response.json();
        mensaje.textContent = 'Error al guardar los cambios: ' + resultado.error;
        mensaje.className = 'mensaje-error';
    }
}

 export async function fetchUsuarios() {
    const response = await fetch('http://localhost:4000/api/usuarios');
    const usuarios = await response.json();
    return usuarios;
}
function mostrarUsuarios(usuarios) {
    listaUsuarios.innerHTML = '';
    usuarios.forEach(usuario => {
        const div = document.createElement('div');
        div.className = 'usuario-item';
        div.textContent = `${usuario.nombre} ${usuario.apellidos}`;
        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', () => mostrarFormularioEdicion(usuario));
        div.appendChild(botonEditar);
        listaUsuarios.appendChild(div);
    });
}