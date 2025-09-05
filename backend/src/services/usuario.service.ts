import prisma from "../config/prisma";
import { CreateUsuarioRequest, UpdateUsuarioRequest } from "../types/usuarios.types";

// Obtener todos los usuarios
export async function getAllUsuarios() {
  return await prisma.usuario.findMany();
}

// Obtener todos los usuarios postulantes
export async function getAllUsuariosPostulantes() {
  return await prisma.usuario.findMany({
    where: { rolPostulante: true },
  });
}

// Obtener todos los usuarios empleadores
export async function getAllUsuariosEmpleadores() {
  return await prisma.usuario.findMany({
    where: { rolPostulante: false },
  });
}

// Obtener usuario por ID
export async function getUsuarioById(id: number) {
  const usuario = await prisma.usuario.findUnique({ where: { id } });
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
}

// Crear un nuevo usuario
export async function createUsuario(data: CreateUsuarioRequest) {
  return await prisma.usuario.create({ data });
}

// Actualizar un usuario
export async function updateUsuario(id: number, data: UpdateUsuarioRequest) {
  return await prisma.usuario.update({
    where: { id },
    data,
  });
}

// Eliminar usuario
export async function deleteUsuario(id: number) {
  await prisma.usuario.delete({ where: { id } });
}


// buscar por Login
export async function loginUsuario(email: string, contraseña: string) {
  const usuario = await prisma.usuario.findFirst({
    where: { mail: email, contraseña },
  });
  return usuario || null;
}


