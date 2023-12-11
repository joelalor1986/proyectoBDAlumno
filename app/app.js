let controladorBD = new ManejadorBD();
const bd = "proyectoBD";
if (localStorage.getItem(bd) != null) {
    let bdRecuperada = JSON.parse(localStorage.getItem(bd));
    console.log(bdRecuperada);
    controladorBD.baseDatos.keyAlumno = bdRecuperada.keyAlumnos;
    controladorBD.baseDatos.keyMateria = bdRecuperada.keyMaterias;
    controladorBD.baseDatos.keyAlumnoMaterias = bdRecuperada.keyAlumnoMaterias;
    controladorBD.baseDatos.keyGrupo = bdRecuperada.keyGrupos;
    controladorBD.baseDatos.tablaAlumnos = new Map(bdRecuperada.tablaAlumnos);
    controladorBD.baseDatos.tablaMaterias = new Map(bdRecuperada.tablaMaterias);
    controladorBD.baseDatos.tablaAlumnoMateria = new Map(bdRecuperada.tablaAlumnoMaterias);
    controladorBD.baseDatos.tablaGrupos = new Map(bdRecuperada.tablaGrupos);
}

document.addEventListener("DOMContentLoaded", cargarTablaAlumnos);
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
    console.log(bdGuardar);
    localStorage.setItem(bd, JSON.stringify(bdGuardar));
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
                <button type="button" class="btn btn-success">Editar</button>
                <button type="button" class="btn btn-primary" onClick=cargarTablaMateriasAlumno(${alumno.id})>Materias</button>
                <button type="button" class="btn btn-danger" onClick=eliminarAlumno(${alumno.id})>elimniar</button>
              </div>
            </td>
        </tr>`;
    });
    tablaAlumnohtml += `</tbody></table>`;
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
                <button type="button" class="btn btn-success">Editar</button>
                <button type="button" class="btn btn-danger" onClick=eliminarMateria(${materia.id})>elimniar</button>
              </div>
            </td>
        </tr>`;
    });
    tablaMateriahtml += `</tbody></table>`;
    tablaContenedor.innerHTML = tablaMateriahtml;
}
function cargarTablaMateriasAlumno(idAlumno) { }
function eliminarAlumno(id) {
    controladorBD.eliminarAlumno(id);
    cargarTablaAlumnos();
}
function eliminarMateria(id) {
    controladorBD.eliminarMateria(id);
    cargarTablaMaterias();
}
$("body").addEventListener("click", (e) => {
    if (e.target.id == "btnAgregarAlumno") {
        let alumno = new Alumno(
            $("#nombreAlumno").value,
            $("#apellidosAlumno").value,
            $("#edadAlumno").value
        );
        controladorBD.agregarAlumno(alumno);
        cargarTablaAlumnos();
        const modal = $("#modalAgregarAlumno");
        const intaciaModal = bootstrap.Modal.getInstance(modal);
        intaciaModal.hide();
    }
    if (e.target.id == "verListaAlumnos") {
        cargarTablaAlumnos();
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
    }
    if (e.target.id == "agregarGrupo") {
    }
});
function $(selector) {
    return document.querySelector(selector);
}