import { z } from 'zod';

export const createOfertaSchema = z.object({
    categoria: z.string()
    .min(1,"La categoria de la oferta es requerida")
    .max(50,"La categoria de la oferta no puede exceder los 50 caracteres")
    .trim(),
    ubicacion: z.string()
    .min(1,"La ubicación de la oferta es requerida")
    .max(50,"La ubicación de la oferta no puede exceder los 50 caracteres")
    .trim(),
    sueldo: z.number()
    .optional()
    .int()
    .positive(),
    modalidad: z.literal(["presencial" , "remoto" , "hibrido"]),
    horario: z.array(
        z.iso.datetime()
    ),
    creadorId: z.number()
    .positive(),
    formulario: z.array(
        z.number()
        .int('ID de formulario invalido')
         .positive('ID de formulario debe ser positivo')
       ).optional()
})

export const updateOfertaSchema = createOfertaSchema.partial()