import * as yup from 'yup';

export const formularioPostulacionSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .min(1, 'Debes ingresar tu nombre')
    .max(30, 'No se pueden exceder los 30 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras')
    .trim(),

  apellido: yup
    .string()
    .required('El apellido es obligatorio')
    .min(1, 'Debes ingresar tu apellido')
    .max(30, 'No se pueden exceder los 30 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras')
    .trim(),

  localidad: yup
    .string()
    .required('La ciudad/localidad es obligatoria')
    .min(1, 'Debes ingresar tu localidad')
    .max(50, 'No se deben exceder los 50 caracteres')
    .trim(),

  pais: yup
    .string()
    .required('El país es obligatorio')
    .min(1, 'Debes seleccionar tu país')
    .max(30, 'No se deben exceder los 30 caracteres')
    .trim(),

  genero: yup
    .string()
    .required('El género es obligatorio')
    .oneOf(
      ['masculino', 'femenino', 'otro'],
      'Seleccioná una opción válida'
    ),

  descripcion: yup
    .string()
    .required('La descripción es obligatoria')
    .min(20, 'La presentación debe tener al menos 20 caracteres')
    .max(500, 'No se deben exceder los 500 caracteres')
    .trim(),

  archivo: yup
    .mixed()
    .required('Debes subir tu curriculum vitae')
    .test('fileSize', 'El archivo no debe superar los 5MB', function(value) {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'Solo se permiten archivos PDF, DOC o DOCX', function(value) {
      if (!value) return false;
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      return validTypes.includes(value.type);
    }),
});