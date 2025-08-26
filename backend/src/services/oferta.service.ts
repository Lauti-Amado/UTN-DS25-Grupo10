import prisma from "../config/prisma";
import { CreateOfertaRequest, UpdateOfertaResquest, Oferta } from "../types/ofertas.types";

// Obtener todas las ofertas
export async function getAllOfertas(): Promise<Oferta[]> {
  return prisma.oferta.findMany({
    include: { creador: true, postulados: true },
  }) as unknown as Oferta[];
}

// Obtener oferta por ID
export async function getOfertaById(id: number): Promise<Oferta> {
  const oferta = await prisma.oferta.findUnique({
    where: { id },
    include: { creador: true, postulados: true },
  });
  if (!oferta) throw new Error("Oferta no encontrada");
  return oferta as unknown as Oferta;
}

// Crear nueva oferta
export async function createOferta(data: CreateOfertaRequest): Promise<Oferta> {
  return prisma.oferta.create({
    data: {
      categoria: data.categoria,
      ubicacion: data.ubicacion,
      sueldo: data.sueldo,
      modalidad: data.modalidad,
      horario: data.horario,
      creador: { connect: { id: data.creadorId } },
      postulados: data.postuladosIds
        ? { connect: data.postuladosIds.map((id) => ({ id })) }
        : undefined,
    },
    include: { creador: true, postulados: true },
  }) as unknown as Oferta;
}

// Actualizar oferta
export async function updateOferta(id: number, data: UpdateOfertaResquest): Promise<Oferta> {
  return prisma.oferta.update({
    where: { id },
    data: {
      categoria: data.categoria,
      ubicacion: data.ubicacion,
      sueldo: data.sueldo,
      modalidad: data.modalidad,
      horario: data.horario,
      postulados: data.postuladosIds
        ? {
            set: [],
            connect: data.postuladosIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: { creador: true, postulados: true },
  }) as unknown as Oferta;
}

// Obtener todas las ofertas de un empleador
export async function getOfertasByEmpleadorId(empleadorId: number): Promise<Oferta[]> {
  return prisma.oferta.findMany({
    where: { creadorId: empleadorId },
    include: { creador: true, postulados: true },
  }) as unknown as Oferta[];
}

// Eliminar oferta
export async function deleteOferta(id: number): Promise<void> {
  await prisma.oferta.delete({ where: { id } });
}
