import { z } from 'zod';
// Schema para crear usuario
export const createUserSchema = z.object({
email: z.email('Email inválido')
.toLowerCase()
.trim(),
password: z.string()
.min(8, 'Mínimo 8 caracteres')
.regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
.regex(/[0-9]/, 'Debe contener al menos un número'),
name: z.string()
.min(2, 'Mínimo 2 caracteres')
.max(50, 'Máximo 50 caracteres')
.trim(),
role: z.enum(['USER', 'ADMIN']).optional().default('USER')
});
// Schema para actualizar (todos los campos opcionales)
export const updateUserSchema = createUserSchema.partial();