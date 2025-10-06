import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('El mail es requerido')
    .max(50, 'El mail no puede exceder los 50 caracteres')
    .email('El mail debe contener un formato válido')
    .trim(),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .max(50, 'La contraseña no puede exceder los 50 caracteres')
    .trim()
});