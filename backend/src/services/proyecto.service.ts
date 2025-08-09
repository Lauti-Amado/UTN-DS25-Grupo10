import {Proyecto, CreateProyectoRequest, UpdateProyectoRequest} from '../proyectos.types/';

// Mock data (proxima clase: PostgreeSQL real)
let proyectos: Proyecto[] = [
    {}
];

export async function getAllProyectos(): Promise <Proyecto[]>{
    return proyectos;
}

export async function getProyectoById(id: number): Promise<Proyecto> {
  const proyecto = proyectos.find(b => b.id === id);
  if (!proyecto) {
    const error = new Error('Proyecto no encontrado');
    (error as any).statusCode = 404;
    throw error;
  }
  return proyecto;
}