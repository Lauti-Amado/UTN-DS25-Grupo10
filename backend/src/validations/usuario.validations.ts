import { z } from 'zod';

export const createUsuarioSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre del usuario es requerido')
    .max(25, 'El nombre del usuario no puede exceder los 25 caracteres')
    .trim(),

  contraseña: z.string()
    .min(1, 'La contraseña del usuario es requerida')
    .max(50, 'La contraseña del usuario no puede exceder los 50 caracteres')
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'La contraseña del usuario debe contener por lo menos un número y un carácter especial')
    .trim(),

  mail: z.string()
    .min(1, 'El mail del usuario es requerido')
    .max(50, 'El mail del usuario no puede exceder los 50 caracteres')
    .email('El mail de usuario debe contener un formato válido')
    .trim(),

  nombreUsuario: z.string()
    .min(1, 'El nombre del usuario es requerido')
    .max(25, 'El nombre del usuario no puede exceder los 25 caracteres')
    .trim(),

  rolPostulante: z.boolean()
    .refine(val => val !== undefined, { message: 'Seleccionar una opción' }),

  fotoPerfil: z.string()
    .url("La imagen debe ser una URL válida")
    .optional()
    .nullable(),

  fechaNacimiento: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date().optional().nullable()
  ),

  descripcion: z.string()
    .max(255, "La descripción no puede exceder 255 caracteres")
    .optional()
    .nullable(),

  proyectosCreados: z.array(
    z.number()
      .int('ID de proyecto inválido')
      .positive('ID de proyecto debe ser positivo')
  ).optional(),

  ofertasCreadas: z.array(
    z.number()
      .int('ID de oferta inválida')
      .positive('ID de oferta debe ser positivo')
  ).optional()
});

export const updateUsuarioSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre del usuario no puede estar vacío')
    .max(25, 'El nombre del usuario no puede exceder los 25 caracteres')
    .trim()
    .optional(),

  contraseña: z.string()
    .min(1, 'La contraseña no puede estar vacía')
    .max(50, 'La contraseña del usuario no puede exceder los 50 caracteres')
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'La contraseña debe contener al menos un número y un carácter especial')
    .trim()
    .optional(),

  mail: z.string()
    .max(50, 'El mail del usuario no puede exceder los 50 caracteres')
    .email('El mail debe tener un formato válido')
    .trim()
    .optional(),

  nombreUsuario: z.string()
    .min(1, 'El nombre de usuario no puede estar vacío')
    .max(25, 'El nombre de usuario no puede exceder los 25 caracteres')
    .trim()
    .optional(),

  fotoPerfil: z.string()
    .refine(
      (val) => {
        if (!val) return true;
        return val.match(/\.(jpg|jpeg|png|gif|webp)$/i) || val.startsWith('http');
      },
      "Debe ser un nombre de archivo válido (jpg, png, gif, webp) o una URL"
    )
    .optional()
    .nullable(),

  fechaNacimiento: z.preprocess(
    (arg) => {
      if (!arg) return undefined;
      if (arg instanceof Date) return arg;
      if (typeof arg === 'string') return new Date(arg);
      return undefined;
    },
    z.date().optional().nullable()
  ),

  descripcion: z.string()
    .max(255, "La descripción no puede exceder 255 caracteres")
    .optional()
    .nullable(),

  rolPostulante: z.boolean()
    .optional(),

  proyectosCreados: z.array(
    z.number()
      .int('ID de proyecto inválido')
      .positive('ID de proyecto debe ser positivo')
  ).optional(),

  ofertasCreadas: z.array(
    z.number()
      .int('ID de oferta inválida')
      .positive('ID de oferta debe ser positivo')
  ).optional()
}).strict(); 