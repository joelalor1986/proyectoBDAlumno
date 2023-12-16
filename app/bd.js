class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;

    }
}

class Materia {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class AlumnoMateria {
    constructor(idAlumno, idMateria, calificacion) {
        this.idAlumno = idAlumno;
        this.idMateria = idMateria;
        this.calificacion = calificacion;
    }
}
class Grupo {
    constructor(nombre) {
        this.nombre = nombre;
        this.alumnos = [];
    }
}

class ManejadorBD {
    constructor() {
        this.baseDatos = new BaseDatos();
        this.validador = new Validador();
    }
    agregarAlumno(alumno) {
        if (this.validador.validarAlumno(alumno)) {
            alumno.id = this.baseDatos.keyAlumno;
            this.baseDatos.tablaAlumnos.set(alumno.id, alumno);
            this.baseDatos.keyAlumno++;
        }

    }
    eliminarAlumno(id) {
        if (this.baseDatos.tablaAlumnos.get(id)) {
            this.baseDatos.tablaAlumnos.delete(id);
            this.baseDatos.tablaAlumnoMateria.forEach((valor, clave) => {
                if (valor.idAlumno == id) {
                    //console.log(valor)
                    this.baseDatos.tablaAlumnoMateria.delete(clave)
                }
            })
        }
    }
    agregarMateria(materia) {
        if (this.validador.validarMateria(materia)) {
            materia.id = this.baseDatos.keyMateria;
            this.baseDatos.tablaMaterias.set(materia.id, materia)
            this.baseDatos.keyMateria++;
        }
    }
    eliminarMateria(id) {
        if (this.baseDatos.tablaMaterias.get(id)) {
            this.baseDatos.tablaMaterias.delete(id)
        }
    }
    agregarAlumnoMateria(alumnoMateria) {
        if (this.validador.validarAlumno(alumnoMateria)) {
            alumnoMateria.id = this.baseDatos.keyAlumnoMateria;
            this.baseDatos.tablaAlumnoMateria.set(alumnoMateria.id, alumnoMateria);
            this.baseDatos.keyAlumnoMateria++;
        }
    }
    consultarAlumnoMateria(idAlumno) {
        let alumnoMaterias = [];
        /* console.log(this.baseDatos.tablaAlumnos.get(idAlumno)); */
        this.baseDatos.tablaAlumnoMateria.forEach(element => {
            if (element.idAlumno == idAlumno) {
                //debugger
                let alumno = this.baseDatos.tablaAlumnos.get(idAlumno);
                let materia = this.baseDatos.tablaMaterias.get(element.idMateria);

                alumnoMaterias.push({
                    nombre: alumno.nombre,
                    apellidos: alumno.apellidos,
                    edad: alumno.edad,
                    materia: materia.nombre,
                    calificacion: element.calificacion
                });
            }
        });

        return alumnoMaterias;
    }
    agregarGrupo(grupo) {
        if (this.validador.validarGrupo(grupo)) {
            grupo.id = this.baseDatos.keyGrupos;
            this.baseDatos.tablaGrupos.set(grupo.id, grupo);
            this.baseDatos.keyGrupos++;
        }
    }
    agregarAlumnoGrupo(idGrupo, idAlumno) {
        let grupo = this.baseDatos.tablaGrupos.get(parseInt(idGrupo));
        let alumno = this.baseDatos.tablaAlumnos.get(parseInt(idAlumno));
        // debugger
        grupo.alumnos.push(alumno);
    }
    buscarAlumnoEnGrupos(idAlumno) {
        let grupoAlumno = null;
        this.baseDatos.tablaGrupos.forEach(grupo => {
            let alumno = grupo.alumnos.find(alumno => alumno.id == idAlumno)
            //debugger
            if (alumno) {
                grupoAlumno = grupo;
            }
        })

        return grupoAlumno;
    }
    eliminarGrupo(idGrupo){
        if(this.baseDatos.tablaGrupos.get(idGrupo)){
            this.baseDatos.tablaGrupos.delete(idGrupo);
        }
    }
    guardarBD() {
        console.log(JSON.parse(localStorage("proyectoBD")))
    }
}
class BaseDatos {
    constructor() {
        this.tablaAlumnos = new Map();
        this.tablaMaterias = new Map();
        this.tablaGrupos = new Map();
        this.tablaAlumnoMateria = new Map();
        this.keyAlumno = 0;
        this.keyMateria = 0;
        this.keyGrupos = 0;
        this.keyAlumnoMateria = 0;
    }
}
class Validador {
    validarAlumno(alumno) {
        return true;
    }
    validarMateria(materia) {
        return true;
    }
    validarGrupo(grupo) {
        return true;
    }
    validarAlumnoMateria(alumnoMateria) {
        return true;
    }
}

/* 
let controladorBD = new ManejadorBD();
let alumno = new Alumno("joe", "alor", 37);

controladorBD.agregarAlumno(alumno);
controladorBD.agregarAlumno(new Alumno("juan", "perez", 15));
controladorBD.agregarAlumno(new Alumno("juan2", "perez", 15));
controladorBD.agregarAlumno(new Alumno("juan3", "perez", 15));
controladorBD.agregarAlumno(new Alumno("juan4", "perez", 15));
controladorBD.agregarAlumno(new Alumno("juan5", "perez", 15));

controladorBD.agregarMateria(new Materia("Matematicas"))
controladorBD.agregarMateria(new Materia("Fisica"))
controladorBD.agregarMateria(new Materia("quimica"))

controladorBD.agregarAlumnoMateria(new AlumnoMateria(1, 2, 8))
controladorBD.agregarAlumnoMateria(new AlumnoMateria(1, 1, 8))
controladorBD.agregarAlumnoMateria(new AlumnoMateria(1, 0, 8))
controladorBD.agregarAlumnoMateria(new AlumnoMateria(3, 2, 8))

console.log(controladorBD.baseDatos.tablaMaterias);
console.log(controladorBD.baseDatos.tablaAlumnos);
console.log(controladorBD.baseDatos.tablaAlumnoMateria);

console.log(controladorBD.consultarAlumnoMateria(1)); */

/* let botonagregar = document.querySelector("#btnAgregar");

botonagregar.addEventListener("click", event => {
    event.preventDefault();
    let nombre = document.querySelector("#nombreAlumno").value;
    let apellido = document.querySelector("#apellidosAlumno").value;
    let edad = document.querySelector("#edadAlumno").value;
    let alumno = new Alumno(nombre,apellido,edad)
    console.log(alumno);
}) */