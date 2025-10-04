import { z } from 'zod';

export const createOfertaSchema = z.object({
    titulo: z.string()
      .min(1,"El titulo es requerido en la oferta")
      .max(50,"El titulo no se debe exceder de los 50 caracteres"),
    descripcion: z.string()
      .min(1,"La descripcion es requerida en la oferta")
      .max(150,"La descripcion no se debe exceder de los 150 caracteres"),
    categoria: z.string()
      .min(1,"La categoria de la oferta es requerida")
      .max(50,"La categoria de la oferta no puede exceder los 50 caracteres")
      .trim(),
    ubicacion: z.string()
      .min(1,"La ubicación de la oferta es requerida")
      .max(50,"La ubicación de la oferta no puede exceder los 50 caracteres")
      .trim(),
    sueldo: z.string()
      .optional(),
    modalidad: z.string()
      .optional(),
    horario: z.string().optional(),
    contacto: z.string()
      .min(1,"Se debe ingresar algun medio de contacto")
      .max(80,"El contacto no debe superar los 80 caracteres"),
    logo: z.string()
      .optional(),
    creadorId: z.number()
      .positive(),
})

export const updateOfertaSchema = createOfertaSchema.partial()