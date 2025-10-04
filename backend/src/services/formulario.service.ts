import prisma from '../config/prisma';
import { Formulario, CreateFormularioRequest, } from '../types/formularios.types';

export async function createFormulario(data: CreateFormularioRequest): Promise<Formulario> {
    return prisma.formulario.create({
        data: {
            nombre: data.nombre,
            apellido: data.apellido,
            localidad: data.localidad,
            pais: data.pais,
            genero: data.genero,
            descripcion: data.descripcion,
            curriculum: data.curriculum,
            postulado: { connect: { id: data.postuladoId } },
            oferta: { connect: { id: data.ofertaId } }
        },
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