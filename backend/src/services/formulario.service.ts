import { parse } from 'path';
import prisma from '../config/prisma';
import { Formulario, CreateFormularioRequest, UpdateFormularioRequest } from '../types/formularios.types';

export async function createFormulario(data: CreateFormularioRequest) {
  const createData: any = {
    nombre: data.nombre,
    apellido: data.apellido,
    localidad: data.localidad,
    pais: data.pais,
    genero: data.genero,
    descripcion: data.descripcion,
    curriculum: data.curriculum,
  };

  if (data.postuladoId && Number.isInteger(data.postuladoId) && data.postuladoId > 0) {
    createData.postulado = { connect: { id: data.postuladoId } };
  }

  if (data.ofertaId && Number.isInteger(data.ofertaId) && data.ofertaId > 0) {
    createData.oferta = { connect: { id: data.ofertaId } };
  }

  return prisma.formulario.create({
    data: createData,
    select: {
      nombre: true,
      apellido: true,
      localidad: true,
      pais: true,
      genero: true,
      descripcion: true,
      curriculum: true,
    }
  });
}

export async function getExistePostulacion( UsuarioId: number, OfertaId: number ): Promise<boolean> {
  try {
    const registro = await prisma.formulario.findFirst({
      where: { 
        ofertaId: OfertaId, 
        postuladoId: UsuarioId 
      }
    });
    return registro !== null;
  } catch (error) {
    console.error("Error service getExistePostulacion:", error);
    return false; // nunca rompe
  }
}

export async function getFormulariosByOferta (id:number) {
    return prisma.formulario.findMany({
        where: { ofertaId: id },
        select: {
            nombre: true,
            apellido: true,
            localidad: true,
            pais: true,
            genero: true,
            descripcion: true,
            curriculum: true,
            postulado: true,
            oferta: true
        }
    });
}

export async function contratarPostulante (id1: number, id2:number) {
   return prisma.formulario.update({
      where: { postuladoId_ofertaId: {
                 postuladoId: id1, ofertaId: id2}
             },
      data: {
        contratado: true
      }
   })
}