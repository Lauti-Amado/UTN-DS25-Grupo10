import {z} from 'zod';

export const createUsuarioSchema=z.object({
   nombre:z.string()
   .min(1, 'El nombre del usuario es requerido')
   .max(25, 'El nombre del usuario no puede exceder los 25 caracteres')
   .trim(),

   contraseña:z.string()
   .min(1, 'La contraseña del usuario es requerida')
   .max(50, 'La contraseña del usuario no puede exceder los 50 caracteres')
   .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'La contraseña del usuario debe contener por los menos un numero y un caracter especial')
   .trim(),

   mail:z.string()
   .min(1, 'El mail del usuario es requerido')
   .max(50, 'El mail del usuario no puede exceder los 50 caracteres')
   .email('El mail de usuario debe contener un formato valido')
   .trim(),

   nombreUsuario:z.string()
   .min(1, 'El nombre del usuario es requerido')
   .max(25, 'El nombre del usuario no puede exceder los 25 caracteres')
   .trim(),
   
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

   rolPostulante:z.boolean()
   .refine(val=>val!==undefined,{message: 'Seleccionar una opcion'}),

   proyectosCreados:z.array(
    z.number()
    .int('ID de proyecto invalido')
     .positive('ID de proyecto debe ser positivo')
   ).optional(),

   ofertasCreadas:z.array(
    z.number()
    .int('ID de oferta invalida')
     .positive('ID de oferta debe ser positivo')
   ).optional()
});

export const updateUsuarioSchema = createUsuarioSchema.partial()
