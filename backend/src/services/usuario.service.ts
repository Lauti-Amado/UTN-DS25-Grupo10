import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { CreateUsuarioRequest, UpdateUsuarioRequest } from "../types/usuarios.types";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); 

export async function getAllUsuarios() {
  return await prisma.usuario.findMany({
    orderBy: { id: "asc" },
    select: {
      id: true,
      nombre: true,
      nombreUsuario: true,
      mail: true,
      rolPostulante: true,
      esAdmin: true,
      activo: true,
      fotoPerfil: true,
      fechaNacimiento: true,
      descripcion: true,
    }
  });
}

export async function getAllUsuariosPostulantes() {
  return await prisma.usuario.findMany({
    where: { rolPostulante: true },
    select: {
      id: true,
      nombre: true,
      nombreUsuario: true,
      mail: true,
      rolPostulante: true,
      activo: true
    }
  });
}

export async function getAllUsuariosEmpleadores() {
  return await prisma.usuario.findMany({
    where: { rolPostulante: false },
    select: {
      id: true,
      nombre: true,
      nombreUsuario: true,
      mail: true,
      rolPostulante: true,
      activo: true
    }
  });
}

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
      activo: true,
      esAdmin: true
    }
  });

  if (!usuario) {
    const error = new Error("Usuario no encontrado") as any;
    error.statusCode = 404;
    throw error;
  }

  return {
    ...usuario,
    fotoPerfil: usuario.fotoPerfil ? `/uploads/${usuario.fotoPerfil}` : null
  };
}

export async function createUsuario(data: CreateUsuarioRequest) {
  try {
    const exists = await prisma.usuario.findUnique({ where: { mail: data.mail } });
    if (exists) {
      const error = new Error("Email ya registrado") as any;
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.contraseña, 10);

    const usuario = await prisma.usuario.create({
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

    await resend.emails.send({
      from: "noreply@resend.dev",
      to: usuario.mail,
      subject: "¡Bienvenido a RoDi!",
      html: `<p>Hola <strong>${usuario.nombre}</strong>,</p>
             <p>Gracias por registrarte en RoDi. ¡Tu cuenta ya está activa!</p>
             <p>Ya puedes iniciar sesión y comenzar a usar la plataforma.</p>
             <p>El equipo de RoDi</p>`
    });

    return usuario;
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
        activo: true,
        esAdmin: true
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

// Función para activar/desactivar usuario
export async function toggleUsuarioActivo(id: number, activo: boolean): Promise<void> {
  try {
    await prisma.usuario.update({
      where: { id },
      data: { activo }
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

export async function getUsuariosSugeridos(usuarioId: number, limit: number = 5) {
  try {
    const totalUsuarios = await prisma.usuario.count({
      where: {
        id: { not: usuarioId },
        activo: true
      }
    });

    if (totalUsuarios === 0) {
      return [];
    }

    if (totalUsuarios <= limit) {
      return await prisma.usuario.findMany({
        where: {
          id: { not: usuarioId },
          activo: true
        },
        select: {
          id: true,
          nombre: true,
          nombreUsuario: true,
          mail: true,
          rolPostulante: true,
          fotoPerfil: true,
          descripcion: true,
        },
        orderBy: {
          id: "asc"
        }
      });
    }
    
    const todosLosUsuarios = await prisma.usuario.findMany({
      where: {
        id: { not: usuarioId },
        activo: true
      },
      select: {
        id: true,
        nombre: true,
        nombreUsuario: true,
        mail: true,
        rolPostulante: true,
        fotoPerfil: true,
        descripcion: true,
      },
      orderBy: {
        id: "asc"
      }
    });

    const usuariosMezclados = todosLosUsuarios.sort(() => Math.random() - 0.5);
    return usuariosMezclados.slice(0, limit);

  } catch (error) {
    console.error("Error en getUsuariosSugeridos:", error);
    throw error;
  }
}

// Validar si el usuario está activo en el login
export async function loginUsuario(email: string, contraseña: string) {
  const usuario = await prisma.usuario.findUnique({ where: { mail: email } });
  
  if (!usuario) {
    const error = new Error("Credenciales inválidas") as any;
    error.statusCode = 401;
    throw error;
  }

  // VERIFICAR SI EL USUARIO ESTÁ DESACTIVADO ANTES DE VALIDAR CONTRASEÑA
  if (!usuario.activo) {
    const error = new Error("USUARIO_DESACTIVADO") as any;
    error.statusCode = 403;
    throw error;
  }

  const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!validPassword) {
    const error = new Error("Credenciales inválidas") as any;
    error.statusCode = 401;
    throw error;
  }

  // Enviar email de notificación de login
  await resend.emails.send({
    from: "noreply@resend.dev",
    to: usuario.mail,
    subject: "Inicio de sesión en RoDi",
    html: `<p>Hola <strong>${usuario.nombre}</strong>,</p>
           <p>Se ha iniciado sesión en tu cuenta de RoDi.</p>
           <p>Si no fuiste tú, por favor cambia tu contraseña inmediatamente.</p>
           <p>— Equipo de RoDi</p>`
  });

  const secret: Secret = process.env.JWT_SECRET || "default_secret";

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.mail,
      rolPostulante: usuario.rolPostulante,
      esAdmin: usuario.esAdmin
    },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "2h" } as SignOptions
  );

  const { contraseña: _, ...usuarioSinPass } = usuario;
  return { usuario: usuarioSinPass, token };
}

export async function recuperarContrasena(email: string) {
  const usuario = await prisma.usuario.findUnique({ where: { mail: email } });
  if (!usuario) {
    const error = new Error("Correo no registrado") as any;
    error.statusCode = 404;
    throw error;
  }

  const codigoValidador = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
  const expiracionToken = new Date(Date.now() + 3600000);

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { 
      resetToken: codigoValidador,
      expiracionToken 
    },
  });

  await resend.emails.send({
    from: "noreply@resend.dev",
    to: email,
    subject: "Recuperación de contraseña",
    html: `<p>Por favor, ingresá el número <b>${codigoValidador}</b> para poder modificar tu contraseña</p>`,
  });

  return { message: "Correo de recuperación enviado" };
}

export async function verificarCodigo(email: string, codigo: string) {
  const usuario = await prisma.usuario.findUnique({ where: { mail: email } });

  if (!usuario) {
    const error = new Error("Correo no registrado") as any;
    error.statusCode = 404;
    throw error;
  }

  if (!usuario.resetToken || !usuario.expiracionToken) {
    const error = new Error("No se ha solicitado recuperación de contraseña") as any;
    error.statusCode = 400;
    throw error;
  }

  if (usuario.expiracionToken < new Date()) {
    const error = new Error("Código expirado") as any;
    error.statusCode = 400;
    throw error;
  }

  if (usuario.resetToken !== codigo) {
    const error = new Error("Código incorrecto") as any;
    error.statusCode = 401;
    throw error;
  }

  return { message: "Código verificado correctamente" };
}

export async function buscarUsuarios(usuarioId: number, query: string) {
  try {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm.length < 2) {
      return [];
    }

    const usuarios = await prisma.usuario.findMany({
      where: {
        id: { not: usuarioId },
        activo: true,
        OR: [
          {
            nombreUsuario: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            nombre: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      select: {
        id: true,
        nombre: true,
        nombreUsuario: true,
        mail: true,
        rolPostulante: true,
        fotoPerfil: true,
        descripcion: true,
      },
      orderBy: {
        nombreUsuario: 'asc'
      },
      take: 6 
    });

    return usuarios;
  } catch (error) {
    console.error("Error en buscarUsuarios:", error);
    throw error;
  }
}

export async function resetContrasena(token: string, nuevaContrasena: string) {
  const usuario = await prisma.usuario.findFirst({
    where: {
      resetToken: token,
      expiracionToken: { gte: new Date() },
    },
  });

  if (!usuario) {
    const error = new Error("Token inválido o expirado") as any;
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: {
      contraseña: hashedPassword,
      resetToken: null,
      expiracionToken: null,
    },
  });

  return { message: "Contraseña restablecida exitosamente" };
}