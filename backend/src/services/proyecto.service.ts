import { Proyecto, CreateProyectoRequest, UpdateProyectoRequest } from '../types/proyectos.types';

let proyectos: Proyecto[] = [
  {
    id: 1,
    nombre: "Juego de logica",
    descripcion: "Combino muchas herramientas para llevarlo acabo",
    tecnologiasUsadas: ["React","JavaScript","Bootstrap"],
    createdAt: new Date('1970-01-01T09:00:00'),
    creador: {
      id: 1,
      nombre: 'Yamil Tundis',
      contraseña: 'jdalsdjlsdjadl',
      mail: 'yamiltundis6@gmail.com',
      descripcion: 'Estoy en busca de mi primer empleo',
      rolPostulante: true,
      fecha: new Date('2020-20-03T00:00:00'),
      fotoperfil: 'fotoPerfilYamil.png',
    },
  },
  {
    id: 2,
    nombre: "Sistema de un supermercado",
    descripcion: "Muy robusto y elegante",
    tecnologiasUsadas: ["Java"],
    createdAt: new Date('2023-01-01T09:00:00'),
    creador: {
      id: 5,
      nombre: 'Juan Caceres',
      contraseña: 'jdalsdjlsdjadl',
      mail: 'juancaceres@gmail.com',
      descripcion: 'En busca del mejor trabajo',
      rolPostulante: true,
      fecha: new Date('2004-12-31 T00:00:00'),
      fotoperfil: 'fotoPerfilJuan.png',
    },
  },
  {
    id: 3,
    nombre: "Aplicación para un hospital",
    descripcion: "Es muy util",
    tecnologiasUsadas: ["Python","MySQL"],
    createdAt: new Date('2025-10-09T09:00:00'),
    creador: {
      id: 2,
      nombre: 'Julian Figueira',
      contraseña: 'jdalsdjlsdjadl',
      mail: 'julifigueroa@gmail.com',
      descripcion: 'Quiero sumar experiencia laboral',
      rolPostulante: true,
      fecha: new Date('2004-12-17 T00:00:00'),
      fotoperfil: 'fotoPerfilJulian.png',
    },
  },
  {
    id: 4,
    nombre: "Mini Red Social",
    descripcion: "Permite hacer muchas funcionalidades",
    tecnologiasUsadas: ["React","JavaScript","SQL Server","Apis"],
    createdAt: new Date('2025-03-04T09:00:00'),
    creador: {
      id: 2,
      nombre: 'Julian Figueira',
      contraseña: 'jdalsdjlsdjadl',
      mail: 'julifigueroa@gmail.com',
      descripcion: 'Quiero sumar experiencia laboral',
      rolPostulante: true,
      fecha: new Date('2004-12-17 T00:00:00'),
      fotoperfil: 'fotoPerfilJulian.png',
    },
  },
  {
    id: 5,
    nombre: "Sistema de control de logística",
    descripcion: "Permite hacer muchas funcionalidades",
    tecnologiasUsadas: ["Java"],
    createdAt: new Date('2025-03-04T09:00:00'),
    creador: {
      id: 1,
      nombre: 'Yamil Tundis',
      contraseña: 'jdalsdjlsdjadl',
      mail: 'yamiltundis6@gmail.com',
      descripcion: 'Estoy en busca de mi primer empleo',
      rolPostulante: true,
      fecha: new Date('2020-20-03T00:00:00'),
      fotoperfil: 'fotoPerfilYamil.png',
    },
  },
];

// Obtener todos los proyectos
export async function getAllProyectos(): Promise <Proyecto[]>{
    return proyectos;
}

//Obtener proyecto por id
export async function getProyectoById(id: number): Promise<Proyecto> {
  const proyecto = proyectos.find(b => b.id === id);
  if (!proyecto) {
    const error = new Error('Proyecto no encontrado');
    (error as any).statusCode = 404;
    throw error;
  }
  return proyecto;
}

// Crear nuevo proyecto
export async function createProyecto(proyectoData: CreateProyectoRequest): 
Promise<Proyecto> {
 const newProyecto: Proyecto = {
   id: Math.max(...proyectos.map(b => b.id)) + 1,
   ...proyectoData,
   createdAt: new Date(),
 };
 proyectos.push(newProyecto);
 return newProyecto;
}

// Actualizar proyecto existente
export async function updateProyecto(id: number, updateData: UpdateProyectoRequest): Promise<Proyecto> {
 const proyectoIndex = proyectos.findIndex(p => p.id === id);
 if (proyectoIndex === -1) {
   const error = new Error('Proyecto no encontrado');
   (error as any).statusCode = 404;
   throw error;
 }
 proyectos[proyectoIndex] = { ...proyectos[proyectoIndex], ...updateData };
 return proyectos[proyectoIndex];
}

// Eliminar proyecto
export async function deleteProyecto(id: number): Promise<void> {
 const proyectoIndex = proyectos.findIndex(p => p.id === id);
 if (proyectoIndex === -1) {
   const error = new Error('Proyecto no encontrado');
   (error as any).statusCode = 404;
   throw error;
 }
 proyectos.splice(proyectoIndex, 1);
}