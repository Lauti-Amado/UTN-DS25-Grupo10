import * as yup from 'yup';

export const ofertaSchema = yup.object().shape({
  titulo: yup
    .string()
    .required('El título es obligatorio')
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede superar los 100 caracteres')
    .trim(),

  descripcion: yup
    .string()
    .required('La descripción es obligatoria')
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(500, 'La descripción no puede superar los 500 caracteres')
    .trim(),

  categoria: yup
    .string()
    .required('La categoría es obligatoria')
    .min(2, 'La categoría debe tener al menos 2 caracteres')
    .max(50, 'La categoría no puede superar los 50 caracteres')
    .trim(),

  ubicacion: yup
    .string()
    .required('La ubicación es obligatoria')
    .min(3, 'La ubicación debe tener al menos 3 caracteres')
    .max(100, 'La ubicación no puede superar los 100 caracteres')
    .trim(),

  sueldo: yup
    .string()
    .required('El sueldo es obligatorio')
    .test('sueldo-valido', 'Ingresá un número válido o texto como "A convenir"', function(value) {
      if (!value || value.trim() === '') return false;
      
      // Si contiene palabras como "convenir", "acordar", es válido
      const textoPermitido = /convenir|acordar|negociar|definir/i;
      if (textoPermitido.test(value)) return true;
      
      // Si es un número (puede tener puntos, comas, $, etc.)
      const numeroLimpio = value.replace(/[^\d]/g, '');
      if (numeroLimpio && !isNaN(numeroLimpio)) return true;
      
      return false;
    }),

  modalidad: yup
    .string()
    .notRequired()
    .oneOf(
      ['', 'Presencial', 'Híbrida', 'Remota'], 
      'Seleccioná una modalidad válida'
    ),

  horario: yup
    .string()
    .required('El horario es obligatorio')
    .oneOf(
      ['Part-time', 'Full-time'], 
      'Seleccioná Part-time o Full-time'
    ),

  contacto: yup
    .string()
    .required('El contacto es obligatorio')
    .test('contacto-valido', 'Ingresá un email válido, teléfono (mín. 8 dígitos) o URL completa', function(value) {
      if (!value || value.trim() === '') return false;

      const valorLimpio = value.trim();

      // 1. Validar EMAIL (debe tener @ y dominio válido)
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(valorLimpio)) return true;

      // 2. Validar TELÉFONO (mínimo 8 dígitos, puede tener +, espacios, guiones, paréntesis)
      const soloDigitos = valorLimpio.replace(/[\s\-\(\)\+\.]/g, '');
      if (/^\d{8,15}$/.test(soloDigitos)) return true;

      // 3. Validar URL completa
      if (/^https?:\/\/.+\..+/.test(valorLimpio)) {
        try {
          new URL(valorLimpio);
          return true;
        } catch {
          return false;
        }
      }

      // Si no cumple ninguna, es inválido
      return false;
    })
    .max(100, 'El contacto no puede superar los 100 caracteres')
    .trim(),

  logo: yup
    .string()
    .notRequired()
    .test('url-valida', 'El logo debe ser una URL válida', function(value) {
      if (!value || value.trim() === '') return true;
      
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }),
});