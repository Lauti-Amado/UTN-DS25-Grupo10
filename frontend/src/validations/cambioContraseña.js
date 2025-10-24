 import * as yup from 'yup';
 import { registroSchema } from './registroSchema';

 export const cambioContrasenaSchema = yup.object().shape({
  nueva: registroSchema.fields.contraseña, // Reutiliza la regla de contraseña existente
  confirmar: yup
    .string()
    .oneOf([yup.ref('nueva')], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña'),
});