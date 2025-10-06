// ofertaSchema.js
import * as yup from 'yup';

export const ofertaSchema = yup.object().shape({
  titulo: yup
    .string()
    .required('El título es obligatorio')
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede superar los 100 caracteres'),
  descripcion: yup
    .string()
    .required('La descripción es obligatoria')
    .min(20, 'La descripción debe tener al menos 20 caracteres'),
  categoria: yup
    .string()
    .required('La categoría es obligatoria'),
  ubicacion: yup
    .string()
    .required('La ubicación es obligatoria'),
  horario: yup
    .string()
    .required('El horario es obligatorio'),
  contacto: yup
    .string()
    .required('El contacto es obligatorio'),
  sueldo: yup
    .string()
    .notRequired()
    .matches(/^\d*$/, 'El sueldo debe ser un número'),
  modalidad: yup
    .string()
    .notRequired(),
  logo: yup
    .string()
    .notRequired()
    .url('El logo debe ser una URL válida'),
});
