let tablaAlumnos = [];
let tablaMaterias = [];
let tablaGrupos = [];
let tablaMateriasAlumnos = [];
class Alumno{
    constructor(nombre,apellidos,edad){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        
    }
}

class MateriasAlumnos{
    constructor(idAlumno,idMateria,calificacion){

        this.idAlumno = idAlumno;
        this.idMateria = idMateria;
        this.calificacion = calificacion;
    }
}

class Materia{
    constructor(materia){
        this.materia = materia;
    }
}

class Grupo{
    constructor(nombre){
        this.nombre  = nombre;
        this.alumnos = [];
    }
}

function agregarAlumno(alumno){
    alumno.id = tablaAlumnos.length;
    tablaAlumnos.push(alumno);
}
function obtnerAlumno(id){
    return tablaAlumnos[id];
}

function agregarMateria(materia){
    materia.id = tablaMaterias.length;
    tablaMaterias.push(materia);
}
function agregarMateriaAlumnos(materiaAlumnos){
    materiaAlumnos.id = tablaMateriasAlumnos.length;
    tablaMateriasAlumnos.push(materiaAlumnos);
}

function imprimirAlumnosMaterias(){
    tablaMateriasAlumnos.forEach(materiaAlumno =>{
        console.log(`
        nombre: ${tablaAlumnos[materiaAlumno.idAlumno].nombre} ${tablaAlumnos[materiaAlumno.idAlumno].apellidos} 
        Materia: ${tablaMaterias[materiaAlumno.idMateria].materia} 
        calificacion: ${materiaAlumno.calificacion}`);
    })
}
let alumno = new Alumno("joel","alor",37);
let alumno2 = new Alumno("vale","xxxx",25);
let alumno3 = new Alumno("mali","yyy",22);

agregarAlumno(alumno);
agregarAlumno(alumno2);
agregarAlumno(alumno3);

let materia1 = new Materia("matematicas");
let materia2 = new Materia("fisica");
let materia3 = new Materia("español");
let materia4 = new Materia("ingles");

agregarMateria(materia1);
agregarMateria(materia2);
agregarMateria(materia3);
agregarMateria(materia4);

let materiaAlumno1 = new MateriasAlumnos(0,1,7);
let materiaAlumno2 = new MateriasAlumnos(0,0,8);
let materiaAlumno3 = new MateriasAlumnos(0,2,8.8);

agregarMateriaAlumnos(materiaAlumno1);
agregarMateriaAlumnos(materiaAlumno2);
agregarMateriaAlumnos(materiaAlumno3);
agregarMateriaAlumnos(new MateriasAlumnos(1,1,8.5));
agregarMateriaAlumnos(new MateriasAlumnos(1,3,8.5));
agregarMateriaAlumnos(new MateriasAlumnos(1,0,8.5));

/* console.log(tablaAlumnos);

console.log(obtnerAlumno(2))

console.log(tablaMaterias);

console.log(tablaMateriasAlumnos); */ 

imprimirAlumnosMaterias()
