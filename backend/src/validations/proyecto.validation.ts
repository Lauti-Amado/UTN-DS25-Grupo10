import {z} from 'zod';

export const createProyectoSchema=z.object({
   nombre:z.string()
   .min(1, 'El nombre del proyecto es requerido')
   .max(50, 'El nombre no puedo exceder 50 caracteres')
   .trim(),

   descripcion:z.string()
   .min(1, 'La descripcion del proyecto es requerida')
   .max(300, 'La descripcion del proyecto no puede exceder 300 caracteres')
   .trim(),

   tecnologiasUsadas:z.string()
   .min(1, 'Las tecnologias del proyecto son requeridas')
   .max(100, 'No se puede exceder de 100 caracteres')
   .trim(),

   creadorId:z.number()
   .int('ID de usuario invalido')
   .positive('ID de usuario debe ser positivo')

});

export const updateProyectoSchema=createProyectoSchema.partial()
