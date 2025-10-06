
import prisma from '../config/prisma';
import { Formulario, CreateFormularioRequest, } from '../types/formularios.types';

export async function createFormulario(data: CreateFormularioRequest): Promise<Formulario> {
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
      curriculum: true
    }
  });
}


export async function getFormulariosByOferta (id:number) : Promise<Formulario[]> {
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