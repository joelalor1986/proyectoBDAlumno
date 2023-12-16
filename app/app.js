let controladorBD = new ManejadorBD();
let ordenamiento = {
    porNombre: "desc",
    porApellido: "desc",
    porEdad: "desc",
    porGrupo: "desc"
}
const bd = "proyectoBD";
if (localStorage.getItem(bd) != null) {
    //debugger
    let bdRecuperada = JSON.parse(localStorage.getItem(bd));
    console.log(bdRecuperada);
    controladorBD.baseDatos.keyAlumno = bdRecuperada.keyAlumnos;
    controladorBD.baseDatos.keyMateria = bdRecuperada.keyMaterias;
    controladorBD.baseDatos.keyAlumnoMateria = bdRecuperada.keyAlumnoMaterias;
    controladorBD.baseDatos.keyGrupos = bdRecuperada.keyGrupos;
    controladorBD.baseDatos.tablaAlumnos = new Map(bdRecuperada.tablaAlumnos);
    controladorBD.baseDatos.tablaMaterias = new Map(bdRecuperada.tablaMaterias);
    controladorBD.baseDatos.tablaAlumnoMateria = new Map(bdRecuperada.tablaAlumnoMaterias);
    controladorBD.baseDatos.tablaGrupos = new Map(bdRecuperada.tablaGrupos);

    console.log("-")
}

document.addEventListener("DOMContentLoaded", e => {
    cargarTablaAlumnos2(controladorBD.baseDatos.tablaAlumnos);
});
window.addEventListener("beforeunload", function (e) {
    /*   e.preventDefault();*/
    guardarBDNavegador()

});
function guardarBDNavegador() {
    let bdGuardar = {
        keyAlumnos: controladorBD.baseDatos.keyAlumno,
        keyMaterias: controladorBD.baseDatos.keyMateria,
        keyAlumnoMaterias: controladorBD.baseDatos.keyAlumnoMateria,
        keyGrupos: controladorBD.baseDatos.keyGrupos,
        tablaAlumnos: Array.from(controladorBD.baseDatos.tablaAlumnos.entries()),
        tablaMaterias: Array.from(controladorBD.baseDatos.tablaMaterias.entries()),
        tablaAlumnoMaterias: Array.from(
            controladorBD.baseDatos.tablaAlumnoMateria.entries()
        ),
        tablaGrupos: Array.from(controladorBD.baseDatos.tablaGrupos.entries()),
    };
    console.log(controladorBD.baseDatos)
    console.log(bdGuardar);
    //debugger
    localStorage.setItem(bd, JSON.stringify(bdGuardar));
}
function ordenarAlumnos(campo, sentido) {
    let alumnos = null;
    if (campo == "nombre") {
        alumnos = controladorBD.ordenarAlumnos(campo, sentido);
        ordenamiento.porNombre = sentido == "asc" ? "desc" : "asc";
    }
    if (campo == "apellidos") {
        alumnos = controladorBD.ordenarAlumnos(campo, sentido);
        ordenamiento.porApellido = sentido == "asc" ? "desc" : "asc";
    }
    if (campo == "edad") {
        alumnos = controladorBD.ordenarAlumnos(campo, sentido);
        ordenamiento.porEdad = sentido == "asc" ? "desc" : "asc";
    }
    cargarTablaAlumnos2(alumnos);
}
function cargarTablaAlumnos() {
    let tablaAlumno = controladorBD.baseDatos.tablaAlumnos;
    let tablaContenedor = document.querySelector("#tablasDatos");
    let tablaAlumnohtml = `<table class="table table table-striped table-hover">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellidos</th>
      <th scope="col">Edad</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    `;
    tablaAlumno.forEach((alumno) => {
        tablaAlumnohtml += `<tr>
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellidos}</td>
            <td>${alumno.edad}</td>
            <td>
              <div class=class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                <button type="button" class="btn btn-success" title="Editar usuario"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg></button>
                <button type="button" class="btn btn-primary" onClick=agregarMateriaAlumno(${alumno.id}) title="Agregar materias" dat-bs-toggle="modal" data-bs-target="#modalAgregarMateriaAlumno"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
</svg></button>
 <button class="btn btn-warning" title="lista de materias" onClick="cargarTablaMateriasAlumno(${alumno.id})" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
  <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
</svg>
                </button>
                <button type="button" class="btn btn-danger" onClick=eliminarAlumno(${alumno.id}) title="eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
</svg></button>
               
              </div>
            </td>
        </tr>`;
        //debugger
        //console.log(tablaAlumnohtml);
    });
    tablaAlumnohtml += `</tbody></table>`;
    //console.log(tablaAlumnohtml)
    tablaContenedor.innerHTML = tablaAlumnohtml;
}
function cargarTablaMaterias() {
    let tablaMateria = controladorBD.baseDatos.tablaMaterias;
    let tablaContenedor = document.querySelector("#tablasDatos");
    let tablaMateriahtml = `<table class="table table table-striped table-hover">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>   
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    `;
    tablaMateria.forEach((materia) => {
        tablaMateriahtml += `<tr>
            <td>${materia.id}</td>
            <td>${materia.nombre}</td>
            <td>
              <div class=class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                
                <button type="button" class="btn btn-danger" title="Eliminar materia" onClick=eliminarMateria(${materia.id})><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-minus" viewBox="0 0 16 16">
  <path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/>
  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
</svg></button>
              </div>
            </td>
        </tr>`;
    });
    tablaMateriahtml += `</tbody></table>`;
    tablaContenedor.innerHTML = tablaMateriahtml;
}
function cargarTablaMateriasAlumno(idAlumno) {
    let alumnoMaterias = controladorBD.consultarAlumnoMateria(idAlumno);
    let promedio = alumnoMaterias.reduce((suma, calificacion) => suma + calificacion.calificacion, 0) / alumnoMaterias.length;
    let tablaAlumnohtml = `<table class="table table table-striped table-hover">
    
    <thead>
    <tr>
      <th scope="col">Materia</th>
      <th scope="col">Calificacion</th>      
    </tr>
  </thead>
  <tbody>
    `;
    alumnoMaterias.forEach(materia => {
        tablaAlumnohtml += `
        <tr>
            <td>${materia.materia}</td>
            <td>${materia.calificacion}</td>
        </tr>
        
        `
    })
    tablaAlumnohtml += `<tr class="table-warning"><td>Promedio</td><td>${promedio ? promedio : "No tienes materias asignadas"}</td></tr></tbody></table>`;
    $("#listaMaterias").innerHTML = tablaAlumnohtml;
    let modal = new bootstrap.Modal("#modalListaMateriaAlumno");
    modal.show();

}
function agregarMateriaAlumno(idAlumno) {
    let modal = new bootstrap.Modal("#modalAgregarMateriaAlumno");
    let materiasOption = "";
    controladorBD.baseDatos.tablaMaterias.forEach(materia => {
        let materiAgregada = false;
        controladorBD.baseDatos.tablaAlumnoMateria.forEach(alumnoMateria => {
            if (idAlumno == alumnoMateria.idAlumno && materia.id == alumnoMateria.idMateria) {
                materiAgregada = true;
            }
        });
        if (!materiAgregada) {
            materiasOption += `<option value=${materia.id}>${materia.nombre}</option>`
        }

    })
    $("#selectMaterias").innerHTML = materiasOption;
    $("#idUsuarioAgregarMateria").value = idAlumno;
    modal.show();
}
function eliminarAlumno(id) {
    controladorBD.eliminarAlumno(id);
    cargarTablaAlumnos2(controladorBD.baseDatos.tablaAlumnos);
}
function eliminarMateria(id) {
    controladorBD.eliminarMateria(id);
    cargarTablaMaterias();
}
$("body").addEventListener("click", (e) => {
    if (e.target.id == "btnBuscarAlumno") {
        let valorBuscar = document.querySelector("#txtBuscarAlumno").value;
        let opcion = document.querySelector("#selectBuscar").value;
        let resultadoBusqueda = buscarAlumnos(valorBuscar, opcion);
        cargarTablaAlumnos2(resultadoBusqueda);
        let modal = bootstrap.Modal.getInstance("#modalBuscarAlumno");
        modal.hide();
    }

    if (e.target.id == "btnAgregarGrupo") {
        let grupo = new Grupo($("#nombreGrupo").value);
        controladorBD.agregarGrupo(grupo);
        cargarTablaGrupos(controladorBD.baseDatos.tablaGrupos);
        let modal = bootstrap.Modal.getInstance("#modalAgregarGrupo");
        $("#nombreGrupo").value = "";
        modal.hide();

    }
    if (e.target.id == "verListaGrupos") {
        cargarTablaGrupos(controladorBD.baseDatos.tablaGrupos);
    }
    if (e.target.id == "btnAsignarGrupo") {
        let idAlumno = $("#idAlumnoAsignarGrupo").value;
        let idGrupo = $("#selectIdGrupo").value;
        controladorBD.agregarAlumnoGrupo(idGrupo, idAlumno);
        let modal = bootstrap.Modal.getInstance("#modalAsignarGrupo");
        modal.hide();
        cargarTablaAlumnos2(controladorBD.baseDatos.tablaAlumnos);
    }
    if (e.target.id == "btnAgregarAlumno") {
        // debugger
        let nombre = $("#nombreAlumno").value;
        let apellidos = $("#apellidosAlumno").value;
        let edad = $("#edadAlumno").value;
        let alumno = new Alumno(nombre, apellidos, edad);
        controladorBD.agregarAlumno(alumno);
        cargarTablaAlumnos2(controladorBD.baseDatos.tablaAlumnos);
        const modal = $("#modalAgregarAlumno");
        const intaciaModal = bootstrap.Modal.getInstance(modal);
        intaciaModal.hide();
        limpiarCamposAltaAlumno();
    }
    if (e.target.id == "verListaAlumnos") {
        cargarTablaAlumnos2(controladorBD.baseDatos.tablaAlumnos);
    }
    if (e.target.id == "verListaMateria") {
        cargarTablaMaterias();
    }
    if (e.target.id == "btnAgregarMateria") {
        let materia = new Materia($("#nombreMateria").value);
        controladorBD.agregarMateria(materia);
        cargarTablaMaterias();
        console.log(controladorBD.baseDatos.keyMateria);
        const modal = $("#modalAgregarMateria");
        const intaciaModal = bootstrap.Modal.getInstance(modal);
        intaciaModal.hide();
        $("#nombreMateria").value = "";
    }
    if (e.target.id == "btnAgregarMateriaAlumnos") {
        //debugger
        let idUsuario = parseInt($("#idUsuarioAgregarMateria").value);
        let idMateria = parseInt($("#selectMaterias").value);
        let calificacion = parseFloat($("#calificacionMateria").value);
        let alumnoMateria = new AlumnoMateria(idUsuario, idMateria, calificacion);
        controladorBD.agregarAlumnoMateria(alumnoMateria);
        const instanciaModal = bootstrap.Modal.getInstance($("#modalAgregarMateriaAlumno"));
        instanciaModal.hide();
    }

});
function limpiarCamposAltaAlumno() {
    $("#nombreAlumno").value = ""
    $("#apellidosAlumno").value = ""
    $("#edadAlumno").value = ""
}
function $(selector) {
    return document.querySelector(selector);
}




let divtabla = document.querySelector("#tablasDatos");
divtabla.innerHTML = "<p>hola mundo</p>";

function buscarAlumnos(valorBuscar, opcionBusqueda) {
    let resultado = [];

    if (opcionBusqueda == "nombre") {
        controladorBD.baseDatos.tablaAlumnos.forEach(function (alumno) {
            if (alumno.nombre.includes(valorBuscar)) {
                resultado.push(alumno);
            }
        });
    }
    if (opcionBusqueda == "apellidos") {
        controladorBD.baseDatos.tablaAlumnos.forEach(function (alumno) {
            if (alumno.apellidos.includes(valorBuscar)) {
                resultado.push(alumno);
            }
        });
    }
    if (opcionBusqueda == "edad") {
        controladorBD.baseDatos.tablaAlumnos.forEach(function (alumno) {
            if (alumno.edad == valorBuscar) {
                resultado.push(alumno);
            }
        });
    }
    console.log(resultado);

    return resultado;
}
function cargarTablaGrupos(grupos) {
    let tablaContenedor = document.querySelector("#tablasDatos");
    let tablaHtml = `<table class="table table table-striped table-hover">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    `;
    grupos.forEach(grupo => {
        tablaHtml += `<tr>
            <td>${grupo.id}</td>
            <td>${grupo.nombre}</td>
            <td>
        
                </button>
                <button type="button" class="btn btn-danger" onClick=eliminarGrupo(${grupo.id}) title="eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
</svg></button>
               
              </div>
            </td>
        </tr>`
    })
    tablaHtml += `</tbody ></table >`;
    tablaContenedor.innerHTML = tablaHtml;
}
function asignarGrupo(idAlumno) {
    let modal = new bootstrap.Modal("#modalAsignarGrupo");
    modal.show();
    let selectHtml = "";
    controladorBD.baseDatos.tablaGrupos.forEach(grupo => {
        selectHtml += `<option value="${grupo.id}">${grupo.nombre}</option>`;
    });
    $("#selectIdGrupo").innerHTML = selectHtml;
    $("#idAlumnoAsignarGrupo").value = idAlumno;
}
function cargarTablaAlumnos2(alumnos) {
    let tablaAlumno = alumnos;
    let tablaContenedor = document.querySelector("#tablasDatos");
    let tablaAlumnohtml = `<table class="table table table-striped table-hover">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col" class="click" onClick=ordenarAlumnos('nombre','${ordenamiento.porNombre}')>Nombre</th>
      <th scope="col" class="click" onClick=ordenarAlumnos('apellidos','${ordenamiento.porApellido}')>Apellidos</th>
      <th scope="col" class="click" onClick=ordenarAlumnos('edad','${ordenamiento.porEdad}')>Edad</th>
      <th scope="col" >Grupo</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    `;
    tablaAlumno.forEach((alumno) => {
        //debugger
        let grupo = controladorBD.buscarAlumnoEnGrupos(alumno.id);

        let botonAsignarGrupo = `<button type="button" class="btn btn-success" title="Asignar grupo" onClick=asignarGrupo(${alumno.id})><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg></button>`
        tablaAlumnohtml += `<tr>
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellidos}</td>
            <td>${alumno.edad}</td>
            <td>${grupo ? grupo.nombre : "sin grupo"}  </td>
            <td>
              <div class=class="btn-group btn-group-sm" role="group" aria-label="Small button group">
              ${grupo ? '' : botonAsignarGrupo}   
              
                <button type="button" class="btn btn-primary" onClick=agregarMateriaAlumno(${alumno.id}) title="Agregar materias" dat-bs-toggle="modal" data-bs-target="#modalAgregarMateriaAlumno"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
</svg></button>
 <button class="btn btn-warning" title="lista de materias" onClick="cargarTablaMateriasAlumno(${alumno.id})" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
  <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
</svg>
                </button>
                <button type="button" class="btn btn-danger" onClick=eliminarAlumno(${alumno.id}) title="eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
</svg></button>
               
              </div>
            </td>
        </tr>`;
        //debugger
        //console.log(tablaAlumnohtml);
    });
    tablaAlumnohtml += `</tbody></table>`;
    //console.log(tablaAlumnohtml)
    tablaContenedor.innerHTML = tablaAlumnohtml;
}
function eliminarGrupo(idGrupo) {
    controladorBD.eliminarGrupo(idGrupo);
    cargarTablaGrupos(controladorBD.baseDatos.tablaGrupos);
}
