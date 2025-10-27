
import { z } from 'zod';

export const createFormularioSchema = z.object({
    nombre: z.string()
    .min(1,"Debes ingresar tu nombre")
    .max(30,"No se pueden exceder los 30 caracteres"),
    apellido: z.string()
    .min(1,"Debes ingresar tu apellido")
    .max(30,"No se pueden exceder los 30 caracteres"),
    localidad: z.string()
    .min(1,"Debes ingresar tu localidad")
    .max(50,"No se deben exceder los 50 caracteres")
    .trim(),
    pais: z.string()
    .min(1,"Debes ingresar tu nacionalidad")
    .max(30,"No se deben exceder los 30 caracteres")
    .trim(),
    genero: z.enum(["masculino" , "femenino" , "otro"]),
    descripcion: z.string()
    .min(1,"Debes ingresar una descripcion")
    .max(100,"No se deben exceder los 100 caracteres")
    .trim(),
    postuladoId: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val);
    return val;
  }, z.number().int().positive()),
    contratado: z.boolean()
    .default(false)
    .optional(),
    ofertaId: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val);
    return val;
  }, z.number().int().positive()),
    });

export const updateFormularioSchema = createFormularioSchema.partial()