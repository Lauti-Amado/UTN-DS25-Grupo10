import request from 'supertest';
import { app } from '../app';
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';

jest.mock('../config/prisma', () => ({
  usuario: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe('Rutas de usuarios', () => {
  let token: string;

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      id: 6,
      nombre: 'Administrador',
      nombreUsuario: 'admin',
      mail: 'admin@test.com',
      contraseña: hashedPassword,
      rolPostulante: false,
      esAdmin: true,
    });

   
    const res = await request(app)
      .post('/usuarios/login')
      .send({ mail: 'admin@test.com', contraseña: 'admin123' });

    
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    
  
    token = res.body.data.token; 
  });

  test('GET /usuarios - debe retornar lista de usuarios', async () => {
    (prisma.usuario.findMany as jest.Mock).mockResolvedValue([
      {
        id: 1,
        nombre: 'Usuario1',
        nombreUsuario: 'user1',
        mail: 'user1@test.com',
        rolPostulante: true,
      }
    ]);

    const response = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true); 
  });

  test('GET /usuarios/9999 - debe retornar 404 si usuario no existe', async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get('/usuarios/9999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Usuario no encontrado');
  });
});