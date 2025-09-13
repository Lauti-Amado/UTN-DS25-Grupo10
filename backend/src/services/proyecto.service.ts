import prisma from "../config/prisma";
import { proyectoRouters } from "../routes/proyecto.routes";
import { Proyecto, CreateProyectoRequest, UpdateProyectoRequest } from "../types/proyectos.types";

// Obtener todos los proyectos
export async function getAllProyectos(): Promise<Proyecto[]> {
  const proyectos = await prisma.proyecto.findMany({
    include: { creador: true },
  });
  return proyectos.map(p => ({
    ...p,
    tecnologiasUsadas: typeof p.tecnologiasUsadas === "string" ? p.tecnologiasUsadas.split(",").map(t => t.trim()) : p.tecnologiasUsadas
  }));
}

// Obtener proyecto por id
export async function getProyectoById(id: number): Promise<Proyecto> {
  const proyecto = await prisma.proyecto.findUnique({
    where: { id },
    include: { creador: true },
  });
  if (!proyecto){
  const error=new Error('Proyecto no encontrado') as any;
  error.statusCode = 404;
  throw error;
}
return {
  ...proyecto,
  tecnologiasUsadas: typeof proyecto.tecnologiasUsadas === "string"
    ? proyecto.tecnologiasUsadas.split(",").map(t => t.trim())
    : proyecto.tecnologiasUsadas
};
}

// Crear nuevo proyecto
export async function createProyecto(data: CreateProyectoRequest): Promise<Proyecto> {
  const proyecto = await prisma.proyecto.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      tecnologiasUsadas: Array.isArray(data.tecnologiasUsadas) ? data.tecnologiasUsadas.join(",") : data.tecnologiasUsadas,
      creador: { connect: { id: data.creadorId } },
    },
    include: { creador: true },
  });
  return {
    ...proyecto,
    tecnologiasUsadas: typeof proyecto.tecnologiasUsadas === "string"
      ? proyecto.tecnologiasUsadas.split(",").map(t => t.trim())
      : proyecto.tecnologiasUsadas
  };
}

// Actualizar proyecto existente
export async function updateProyecto(id: number, updateData: UpdateProyectoRequest): Promise<Proyecto> {
  const { tecnologiasUsadas, ...rest } = updateData;
  const data = {
    ...rest,
    ...(tecnologiasUsadas !== undefined
      ? { tecnologiasUsadas: Array.isArray(tecnologiasUsadas) ? tecnologiasUsadas.join(",") : tecnologiasUsadas }
      : {}),
  };
  const proyecto = await prisma.proyecto.update({
    where: { id },
    data,
    include: { creador: true },
  });
  return {
    ...proyecto,
    tecnologiasUsadas: typeof proyecto.tecnologiasUsadas === "string"
      ? proyecto.tecnologiasUsadas.split(",").map(t => t.trim())
      : proyecto.tecnologiasUsadas
  };
}

// Obtener todos los proyectos de un postulante
export async function getProyectosByPostuladoId(postuladoId: number): Promise<Proyecto[]> {
  const proyectos = await prisma.proyecto.findMany({
    where: { creadorId: postuladoId },
    include: { creador: true },
  });
  return proyectos.map(p => ({
    ...p,
    tecnologiasUsadas: typeof p.tecnologiasUsadas === "string" ? p.tecnologiasUsadas.split(",").map(t => t.trim()) : p.tecnologiasUsadas
  }));
}

// Eliminar proyecto
export async function deleteProyecto(id: number): Promise<void> {
  await prisma.proyecto.delete({ where: { id } });
}
