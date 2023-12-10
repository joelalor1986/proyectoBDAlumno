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
    agregarMateria(materia) {
        if (this.validador.validarMateria(materia)) {
            materia.id = this.baseDatos.keyMateria;
            this.baseDatos.tablaMaterias.set(materia.id, materia)
            this.baseDatos.keyMateria++;
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
        this.baseDatos.tablaAlumnoMateria.forEach(element => {
            if (element.idAlumno == idAlumno) {
                alumnoMaterias.push({
                    nombre: this.baseDatos.tablaAlumnos.get(idAlumno).nombre,
                    apellidos: this.baseDatos.tablaAlumnos.get(idAlumno).edad,
                    edad: this.baseDatos.tablaAlumnos.get(idAlumno).edad,
                    materia: this.baseDatos.tablaMaterias.get(element.idMateria).nombre,
                    calificacion: element.calificacion
                });
            }
        });
        return alumnoMaterias;
    }
    agregarGrupo(grupo) {
        if (this.validador(grupo)) {

        }
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

console.log(controladorBD.consultarAlumnoMateria(1));

/* let botonagregar = document.querySelector("#btnAgregar");

botonagregar.addEventListener("click", event => {
    event.preventDefault();
    let nombre = document.querySelector("#nombreAlumno").value;
    let apellido = document.querySelector("#apellidosAlumno").value;
    let edad = document.querySelector("#edadAlumno").value;
    let alumno = new Alumno(nombre,apellido,edad)
    console.log(alumno);
}) */