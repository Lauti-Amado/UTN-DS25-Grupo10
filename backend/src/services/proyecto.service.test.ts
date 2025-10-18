import { getProyectoById } from './proyecto.service';
import prisma from '../config/prisma';

// Mock de Prisma (para no usar BD real)
jest.mock('../config/prisma', () => ({
  proyecto: {
    findUnique: jest.fn()
  }
}));

describe('ProyectoService - getProyectoById', () => {
    test('debe retornar un proyecto cuando existe', async () => {
        // ARRANGE: Es para preparar los datos, en este caso debo cargar un proyecto y el usuario creador
        const mockCreador = { id: 11, 
            nombre: 'yamil',
            nombreUsuario: 'Yamil Tundis',
            mail: 'yamiltundis6@gmail.com',
            rolPostulante: true,
            fotoPerfil: null,
            fechaNacimiento: null,
            descripcion: null };
        const mockProyecto = { 
          id: 2,
          nombre: 'Aplicacion E-comerce',
          descripcion: 'Funciona excelente',
          tecnologiasUsadas: 'React, Java, MySql y AWS',
          creador: mockCreador };
        (prisma.proyecto.findUnique as jest.Mock).mockResolvedValue(mockProyecto);

        // ACT: Ejecuto la función
        const result = await getProyectoById(2);

        // ASSERT: Para verificar el resultado
        expect(result).toEqual(mockProyecto);
        expect(prisma.proyecto.findUnique).toHaveBeenCalledWith({ where: { id: 2 }, include: { creador: true }});
    });
    test('debe lanzar error 404 cuando no existe', async () => {
        // ARRANGE: Simulación de que no existe el proyecto
        (prisma.proyecto.findUnique as jest.Mock).mockResolvedValue(null);

        // ACT Y ASSERT: Verificar que lanza un error
        await expect(getProyectoById(23024)).rejects.toThrow('Proyecto no encontrado');
    })
});