import prisma from "../config/prisma";
import { proyectoRouters } from "../routes/proyecto.routes";
import { Proyecto, CreateProyectoRequest, UpdateProyectoRequest } from "../types/proyectos.types";

// Obtener todos los proyectos
export async function getAllProyectos(): Promise<Proyecto[]> {
  return prisma.proyecto.findMany({
    include: { creador: true },
  }) as unknown as Proyecto[];
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
return proyecto as unknown as Proyecto;
}

// Crear nuevo proyecto
export async function createProyecto(data: CreateProyectoRequest): Promise<Proyecto> {
  return prisma.proyecto.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      tecnologiasUsadas: data.tecnologiasUsadas,
      creador: { connect: { id: data.creadorId } },
    },
    include: { creador: true },
  }) as unknown as Proyecto;
}

// Actualizar proyecto existente
export async function updateProyecto(id: number, updateData: UpdateProyectoRequest): Promise<Proyecto> {
 
  return prisma.proyecto.update({
    where: { id },
    data: updateData,
    include: { creador: true },
  }) as unknown as Proyecto;
}

// Obtener todos los proyectos de un postulante
export async function getProyectosByPostuladoId(postuladoId: number): Promise<Proyecto[]> {
  return prisma.proyecto.findMany({
    where: { creadorId: postuladoId },
    include: { creador: true },
  }) as unknown as Proyecto[];
}

// Eliminar proyecto
export async function deleteProyecto(id: number): Promise<void> {
  await prisma.proyecto.delete({ where: { id } });
}
