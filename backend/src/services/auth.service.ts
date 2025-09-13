import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { LoginRequest } from '../types/auth.types';

export async function login(data: LoginRequest) {
  // Buscar usuario por email
  const usuario = await prisma.usuario.findUnique({ where: { mail: data.email } });
  if (!usuario) {
    const e: any = new Error('Credenciales inválidas');
    e.statusCode = 401;
    throw e;
  }

  // Comparar contraseña
  const ok = await bcrypt.compare(data.password, usuario.contraseña);
  if (!ok) {
    const e: any = new Error('Credenciales inválidas');
    e.statusCode = 401;
    throw e;
  }

  // Configuración del JWT
  const JWT_SECRET: string = process.env.JWT_SECRET || "RoDi_grupo10";
  const expiresIn: string = process.env.JWT_EXPIRES_IN || '2h';

  const payload = { id: usuario.id, email: usuario.mail, rolPostulante: usuario.rolPostulante };

  // Firmar token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions);

  // Devolver usuario sin contraseña
  const { contraseña, ...userWithoutPassword } = usuario;
  return { user: userWithoutPassword, token };
}
