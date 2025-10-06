import * as yup from 'yup';

export const proyectoSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre del proyecto es obligatorio')
    .max(20, 'El nombre no puede superar los 20 caracteres'),
  descripcion: yup
    .string()
    .required('La descripción es obligatoria')
    .min(50, 'La descripción debe tener al menos 50 caracteres')
    .max(400, 'La descripción no puede superar los 400 caracteres'),
  tecnologias: yup
    .string()
    .required('Las tecnologías son obligatorias')
    .max(100, 'Las tecnologías no pueden superar los 100 caracteres'),
});
