import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { CreateUsuarioRequest, UpdateUsuarioRequest } from "../types/usuarios.types";
import crypto from "crypto";
import { Resend } from "resend";

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

// Obtener usuarios aleatorios mejorado
export async function getUsuariosSugeridos(usuarioId: number, limit: number = 5) {
  try {
    // Primero obtener el total de usuarios (excluyendo el usuario actual)
    const totalUsuarios = await prisma.usuario.count({
      where: {
        id: { not: usuarioId }
      }
    });

    console.log(`Total usuarios disponibles: ${totalUsuarios}`);

    if (totalUsuarios === 0) {
      console.log("No hay usuarios para sugerir");
      return [];
    }

    // Si hay pocos usuarios, devolver todos
    if (totalUsuarios <= limit) {
      console.log("Pocos usuarios disponibles, devolviendo todos");
      return await prisma.usuario.findMany({
        where: {
          id: { not: usuarioId }
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
    
    // Obtener todos los usuarios primero
    const todosLosUsuarios = await prisma.usuario.findMany({
      where: {
        id: { not: usuarioId }
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

    // Mezclar aleatoriamente 
    const usuariosMezclados = todosLosUsuarios.sort(() => Math.random() - 0.5);
    const usuariosSeleccionados = usuariosMezclados.slice(0, limit);

    console.log(`Devolviendo ${usuariosSeleccionados.length} usuarios sugeridos`);
    return usuariosSeleccionados;

  } catch (error) {
    console.error("Error en getUsuariosSugeridos:", error);
    throw error;
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

const resend = new Resend(process.env.RESEND_API_KEY); 

export async function recuperarContrasena(email: string) {
  const usuario = await prisma.usuario.findUnique({ where: { mail: email } });
  if (!usuario) {
    const error = new Error("Correo no registrado") as any;
    error.statusCode = 404;
    throw error;
  }

  // ✅ Generar código de 6 dígitos (el que se envía y se valida)
  const codigoValidador = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');

  const expiracionToken = new Date(Date.now() + 3600000); // 1 hora

  // ✅ Guardar ESE código en la BD (no un token criptográfico)
  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { 
      resetToken: codigoValidador, // 👈 aquí va el código de 6 dígitos
      expiracionToken 
    },
  });


  // ✅ Enviar ese mismo código con RESEND
await resend.emails.send({
  from: "noreply@resend.dev", // remitente automático
  to: email,
  subject: "Recuperación de contraseña",
  html: `<p>Por favor, ingresá el número <b>${codigoValidador}</b> para poder modificar tu contraseña</p>`,
});


  return { message: "Correo de recuperación enviado" };
}

// Verificar código de recuperación
export async function verificarCodigo(email: string, codigo: string) {
  // Buscar usuario
  const usuario = await prisma.usuario.findUnique({ where: { mail: email } });

  if (!usuario) {
    const error = new Error("Correo no registrado") as any;
    error.statusCode = 404;
    throw error;
  }

  // Verificar si tiene un código y expiración
  if (!usuario.resetToken || !usuario.expiracionToken) {
    const error = new Error("No se ha solicitado recuperación de contraseña") as any;
    error.statusCode = 400;
    throw error;
  }

  // Verificar expiración del código
  if (usuario.expiracionToken < new Date()) {
    const error = new Error("Código expirado") as any;
    error.statusCode = 400;
    throw error;
  }

  // Comparar código ingresado con el guardado
  if (usuario.resetToken !== codigo) {
    const error = new Error("Código incorrecto") as any;
    error.statusCode = 401;
    throw error;
  }

  // Si todo está bien
  return { message: "Código verificado correctamente" };
}


export async function resetContrasena(token: string, nuevaContrasena: string) {
  // 1️⃣ Buscar usuario por token y verificar expiración
  const usuario = await prisma.usuario.findFirst({
    where: {
      resetToken: token,
      expiracionToken: { gte: new Date() }, // token válido
    },
  });

  if (!usuario) {
    const error = new Error("Token inválido o expirado") as any;
    error.statusCode = 400;
    throw error;
  }

  // 2️⃣ Hashear la nueva contraseña
  const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

  // 3️⃣ Actualizar usuario: nueva contraseña y limpiar token
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



