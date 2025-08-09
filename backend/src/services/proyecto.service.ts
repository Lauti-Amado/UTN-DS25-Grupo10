import {Proyecto, CreateProyectoRequest, UpdateProyectoRequest} from '../proyectos.types/';

// Mock data (proxima clase: PostgreeSQL real)
let proyectos: Proyecto[] = [
    {}
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
 Proyecto.push(newProyecto);
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
 return proyectos[proyectoIndex],
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