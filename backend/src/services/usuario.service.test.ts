import { getUsuarioById } from './usuario.service';
import prisma from '../config/prisma';
import { email } from 'zod';
// Mock de Prisma (para no usar BD real)
jest.mock('../config/prisma', () => ({
usuario: {
findUnique: jest.fn()
}
}));
describe('UserService - getUserById', () => {
test('debe retornar un usuario cuando existe', async () => {
// ARRANGE: Preparar datos de prueba
const mockUser = {  id: 1,
      nombre: 'lau',
      nombreUsuario: 'Lauti',
      mail: 'lau@gmail.com',
      rolPostulante: true,
      fotoPerfil: null,
      fechaNacimiento: null,
      descripcion: null };
(prisma.usuario.findUnique as jest.Mock).mockResolvedValue(mockUser);
// ACT: Ejecutar función
const result = await getUsuarioById(1);
// ASSERT: Verificar resultado
expect(result).toEqual(mockUser);
expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
  where: { id: 1 },
  select: {
    id: true,
    nombre: true,
    nombreUsuario: true,
    mail: true,
    rolPostulante: true,
    fotoPerfil: true,
    fechaNacimiento: true,
    descripcion: true,
  }
});

});

test('debe lanzar error 404 cuando no existe', async () => {
// ARRANGE: Simular que no hay usuarios
(prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);
// ACT & ASSERT: Verificar que lanza error
await expect(getUsuarioById(999)).rejects.toThrow('Usuario no encontrado');
});
});