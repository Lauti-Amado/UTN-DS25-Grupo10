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
    include: { creador: true },
  });
  if (!oferta){
    const error=new Error('Oferta no encontrada') as any;
    error.statusCode= 404;
    throw Error
  }
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
export async function updateOferta(id: number, updateData: UpdateOfertaResquest): Promise<Oferta> {
  return prisma.oferta.update({
    where: { id },
    data: updateData,
    include : { creador: true }
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
  try {
    await prisma.oferta.delete({ where: { id } });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Oferta no encontrada') as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}
