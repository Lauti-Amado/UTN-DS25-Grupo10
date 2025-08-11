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
      fecha: new Date('2020-03-20T00:00:00'),
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
      fecha: new Date('2004-12-31T00:00:00'),
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
      fecha: new Date('2004-12-17T00:00:00'),
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
      fecha: new Date('2004-12-17T00:00:00'),
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
      fecha: new Date('2020-03-20T00:00:00'),
      fotoperfil: 'fotoPerfilYamil.png',
    },
  },
];

// Validar creación de proyecto, campos obligatorios
function validarProyectoCreacion(data: CreateProyectoRequest) {
  if (!data.nombre || typeof data.nombre !== 'string') {
    throw new Error('El nombre es obligatorio y debe ser una cadena de texto');
  }
  if (!data.descripcion || typeof data.descripcion !== 'string') {
    throw new Error('La descripción es obligatoria y debe ser una cadena de texto');
  }
  if (!data.tecnologiasUsadas || !Array.isArray(data.tecnologiasUsadas) || data.tecnologiasUsadas.length === 0) {
    throw new Error('Debe haber al menos una tecnología usada');
  }
  if (!data.creador) {
    throw new Error('El creador es obligatorio');
  }
  if (typeof data.creador.rolPostulante !== 'boolean') {
    throw new Error('El creador debe tener rolPostulante definido');
  }
  if (!data.creador.rolPostulante) {
    throw new Error('El creador debe ser un postulante (rolPostulante = true)');
  }
}

// Validar actualización de proyecto, campos opcionales
function validarProyectoUpdate(data: UpdateProyectoRequest) {
  if ('nombre' in data && (typeof data.nombre !== 'string' || !data.nombre)) {
    throw new Error('El nombre debe ser una cadena de texto no vacía');
  }
  if ('descripcion' in data && (typeof data.descripcion !== 'string' || !data.descripcion)) {
    throw new Error('La descripción debe ser una cadena de texto no vacía');
  }
  if ('tecnologiasUsadas' in data) {
    if (!Array.isArray(data.tecnologiasUsadas) || data.tecnologiasUsadas.length === 0) {
      throw new Error('Debe haber al menos una tecnología usada');
    }
  }
}

// Obtener todos los proyectos
export async function getAllProyectos(): Promise<Proyecto[]> {
  return proyectos;
}

// Obtener proyecto por id
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
export async function createProyecto(proyectoData: CreateProyectoRequest): Promise<Proyecto> {
  validarProyectoCreacion(proyectoData);

  const newProyecto: Proyecto = {
    id: proyectos.length > 0 ? Math.max(...proyectos.map(b => b.id)) + 1 : 1,
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

  validarProyectoUpdate(updateData);

  proyectos[proyectoIndex] = { ...proyectos[proyectoIndex], ...updateData };
  return proyectos[proyectoIndex];
}

// Obtener todos los proyectos de un postulante
export async function getProyectosByPostuladoId(postuladoId: number): Promise<Proyecto[]> {
  return proyectos.filter(o => o.creador.id === postuladoId);
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
