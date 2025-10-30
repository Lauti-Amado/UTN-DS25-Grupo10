import { z } from 'zod';

export const createOfertaSchema = z.object({
  titulo: z.string()
    .min(1, "El título es requerido en la oferta")
    .max(50, "El título no se debe exceder de los 50 caracteres"),
  
  descripcion: z.string()
    .min(1, "La descripción es requerida en la oferta")
    .max(150, "La descripción no se debe exceder de los 150 caracteres"),
  
  categoria: z.string()
    .min(1, "La categoría de la oferta es requerida")
    .max(50, "La categoría de la oferta no puede exceder los 50 caracteres")
    .trim(),
  
  ubicacion: z.string()
    .min(1, "La ubicación de la oferta es requerida")
    .max(50, "La ubicación de la oferta no puede exceder los 50 caracteres")
    .trim(),
  
  sueldo: z.string()
    .min(1, "El sueldo es requerido")
    .refine((val) => {
      if (!val || val.trim() === '') return false;
      // Permitir "A convenir", "A acordar".
      if (/convenir|acordar|negociar|definir/i.test(val)) return true;
      // Permitir números
      const numero = parseFloat(val.replace(/[^0-9.-]/g, ''));
      return !isNaN(numero) && numero >= 0;
    }, { message: "Ingresá un sueldo válido o 'A convenir'" }),
  
  modalidad: z.enum(['Presencial', 'Híbrida', 'Remota', ''])
    .optional(),
  
  horario: z.enum(['Part-time', 'Full-time'])
    .optional(),
  
  contacto: z.string()
    .min(1, "Se debe ingresar algún medio de contacto")
    .max(100, "El contacto no debe superar los 100 caracteres")
    .refine((val) => {
      const valorLimpio = val.trim();

      // Validar email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(valorLimpio)) return true;

      // Validar teléfono (mínimo 8 dígitos)
      const soloDigitos = valorLimpio.replace(/[\s\-\(\)\+\.]/g, '');
      if (/^\d{8,15}$/.test(soloDigitos)) return true;

      // Validar URL completa
      if (/^https?:\/\/.+\..+/.test(valorLimpio)) {
        try {
          new URL(valorLimpio);
          return true;
        } catch {
          return false;
        }
      }

      return false;
    }, { message: "Ingresá un email válido, teléfono (mín. 8 dígitos) o URL completa" }),
  
  logo: z.string()
    .url("Ingresá una URL válida")
    .optional()
    .or(z.literal('')),
  
  creadorId: z.number()
    .positive(),
});

export const updateOfertaSchema = createOfertaSchema.partial();