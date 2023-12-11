if(localStorage.getItem("proyectoBD")){
  
}

let controladorBD = new ManejadorBD();

document.addEventListener("DOMContentLoaded", cargarTablaAlumnos);

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
                <button type="button" class="btn btn-primary">Materias</button>
                <button type="button" class="btn btn-danger">elimniar</button>
              </div>
            </td>
        </tr>`;
  });
  tablaAlumnohtml += `</tbody></table>`;
  tablaContenedor.innerHTML = tablaAlumnohtml;
}
function cargarTablaMaterias(){
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
                <button type="button" class="btn btn-danger">elimniar</button>
              </div>
            </td>
        </tr>`;
  });
  tablaMateriahtml += `</tbody></table>`;
  tablaContenedor.innerHTML = tablaMateriahtml;
}
$("body").addEventListener("click", (e) => {
    if (e.target.id == "btnAgregarAlumno") {
      let alumno = new Alumno($("#nombreAlumno").value, $("#apellidosAlumno").value, $("#edadAlumno").value)
      controladorBD.agregarAlumno(alumno);
      cargarTablaAlumnos();
      const modal = $('#modalAgregarAlumno');
      const intaciaModal =  bootstrap.Modal.getInstance(modal);
      intaciaModal.hide();
    }
    if(e.target.id == "verListaAlumnos"){
      cargarTablaAlumnos();
    }
    if(e.target.id == "verListaMateria"){
      cargarTablaMaterias();
    }
    if(e.target.id=="btnAgregarMateria"){
      let materia = new Materia($("#nombreMateria").value);
      controladorBD.agregarMateria(materia);
      cargarTablaMaterias();
      const modal = $('#modalAgregarMateria');
      const intaciaModal =  bootstrap.Modal.getInstance(modal);
      intaciaModal.hide();
    }
    if(e.target.id=="agregarGrupo"){
      
    }
});
function $(selector) {
  return document.querySelector(selector);
}
