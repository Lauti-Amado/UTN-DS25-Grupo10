import * as yup from 'yup';

export const registroSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(1, 'El nombre es requerido')
    .max(25, 'El nombre no puede exceder los 25 caracteres')
    .trim(),
  nombreUsuario: yup
    .string()
    .required('El nombre de usuario es requerido')
    .min(1, 'El nombre de usuario es requerido')
    .max(25, 'El nombre de usuario no puede exceder los 25 caracteres')
    .trim(),
  email: yup
    .string()
    .required('El mail es requerido')
    .max(50, 'El mail no puede exceder los 50 caracteres')
    .email('El mail debe contener un formato válido')
    .trim(),
  contraseña: yup
    .string()
    .required('La contraseña es requerida')
    .min(1, 'La contraseña es requerida')
    .max(50, 'La contraseña no puede exceder los 50 caracteres')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'La contraseña debe contener al menos un número y un carácter especial (!@#$%^&*)'
    )
    .trim(),
  rol: yup
    .string()
    .required('Debe seleccionar un rol')
    .oneOf(['postulante', 'empleador'], 'Debe seleccionar un rol válido'),
});