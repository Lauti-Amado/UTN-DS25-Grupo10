import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { CreateUsuarioRequest, UpdateUsuarioRequest } from "../types/usuarios.types";

// Obtener todos los usuarios (sin contraseña)
export async function getAllUsuarios(limit: number = 10) {
  return await prisma.usuario.findMany({
    orderBy: { id: "asc" },
    take: limit,
    select: {
      id: true,
      nombre: true,
      nombreUsuario: true,
      mail: true,
      rolPostulante: true
    }
  });
}

// Obtener todos los usuarios postulantes (sin contraseña)
export async function getAllUsuariosPostulantes() {
  return await prisma.usuario.findMany({
    where: { rolPostulante: true },
    select: {
      id: true,
      nombre: true,
      nombreUsuario: true,
      mail: true,
      rolPostulante: true
    }
  });
}

// Obtener todos los usuarios empleadores (sin contraseña)
export async function getAllUsuariosEmpleadores() {
  return await prisma.usuario.findMany({
    where: { rolPostulante: false },
    select: {
      id: true,
      nombre: true,
      nombreUsuario: true,
      mail: true,
      rolPostulante: true
    }
  });
}

// Obtener usuario por ID (sin contraseña)
export async function getUsuarioById(id: number) {
  const usuario = await prisma.usuario.findUnique({
    where: { id },
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

  if (!usuario) {
    const error = new Error("Usuario no encontrado") as any;
    error.statusCode = 404;
    throw error;
  }

  return usuario;
}

// Crear un nuevo usuario (hash de contraseña)
export async function createUsuario(data: CreateUsuarioRequest) {
  try {
    // Verificar si ya existe
    const exists = await prisma.usuario.findUnique({ where: { mail: data.mail } });
    if (exists) {
      const error = new Error("Email ya registrado") as any;
      error.statusCode = 409;
      throw error;
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(data.contraseña, 10);

    // Crear usuario
    return await prisma.usuario.create({
      data: {
        ...data,
        rolPostulante: data.rolPostulante ?? true,
        contraseña: hashedPassword
      },
      select: {
        id: true,
        nombre: true,
        nombreUsuario: true,
        mail: true,
        rolPostulante: true
      }
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      if (error.meta?.target?.includes("mail")) {
        throw new Error("MAIL_DUPLICADO");
      }
      if (error.meta?.target?.includes("nombreUsuario")) {
        throw new Error("USUARIO_DUPLICADO");
      }
    }
    throw error;
  }
}

// Actualizar un usuario (rehash si cambia contraseña)
export async function updateUsuario(id: number, data: UpdateUsuarioRequest) {
  try {
    const updateData: any = { ...data };

    if (data.contraseña) {
      updateData.contraseña = await bcrypt.hash(data.contraseña, 10);
    } else {
      delete updateData.contraseña;
    }

    if (data.fotoPerfil) {
      updateData.fotoPerfil = data.fotoPerfil;
    }

    return await prisma.usuario.update({
      where: { id },
      data: updateData,
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
  } catch (e: any) {
    if (e.code === "P2025") {
      const error = new Error("Usuario no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}

// Eliminar usuario
export async function deleteUsuario(id: number): Promise<void> {
  try {
    await prisma.usuario.delete({ where: { id } });
  } catch (e: any) {
    if (e.code === "P2025") {
      const error = new Error("Usuario no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}

// Login con JWT
export async function loginUsuario(email: string, contraseña: string) {
  const usuario = await prisma.usuario.findUnique({ where: { mail: email } });
  if (!usuario) {
    const error = new Error("Credenciales inválidas") as any;
    error.statusCode = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!validPassword) {
    const error = new Error("Credenciales inválidas") as any;
    error.statusCode = 401;
    throw error;
  }

  const secret: Secret = process.env.JWT_SECRET || "default_secret";

  // Generar token
  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.mail,
      rolPostulante: usuario.rolPostulante
    },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "2h" } as SignOptions
  );

  // Retornar usuario sin contraseña + token
  const { contraseña: _, ...usuarioSinPass } = usuario;
  return { usuario: usuarioSinPass, token };
}