import prisma from "../config/prisma";
import { Proyecto, CreateProyectoRequest, UpdateProyectoRequest } from "../types/proyectos.types";

// Obtener todos los proyectos
export async function getAllProyectos(): Promise<Proyecto[]> {
  return prisma.proyecto.findMany({
    include: { creador: true },
  });
}

// Obtener proyecto por id
export async function getProyectoById(id: number): Promise<Proyecto> {
  const proyecto = await prisma.proyecto.findUnique({
    where: { id },
    include: { creador: true },
  });
  if (!proyecto) throw new Error("Proyecto no encontrado");
  return proyecto;
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
  });
}

// Actualizar proyecto existente
export async function updateProyecto(id: number, updateData: UpdateProyectoRequest): Promise<Proyecto> {
  return prisma.proyecto.update({
    where: { id },
    data: updateData,
    include: { creador: true },
  });
}

// Obtener todos los proyectos de un postulante
export async function getProyectosByPostuladoId(postuladoId: number): Promise<Proyecto[]> {
  return prisma.proyecto.findMany({
    where: { creadorId: postuladoId },
    include: { creador: true },
  });
}

// Eliminar proyecto
export async function deleteProyecto(id: number): Promise<void> {
  await prisma.proyecto.delete({ where: { id } });
}
