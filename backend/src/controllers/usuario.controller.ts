import { Request, Response, NextFunction } from 'express';
import * as usuarioService from '../services/usuario.service';

// Crear Usuario
export const createUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const nuevoUsuario = await usuarioService.createUsuario(req.body);
    return res.status(201).json({ 
      success: true, 
      usuario: nuevoUsuario, 
      message: 'Usuario creado exitosamente' 
    });
  } catch (err: any) {
    console.error("Error en createUsuario:", err);

    const errorMessage = err?.message || "";
    const errores = err?.errores;

    if (errorMessage === "MAIL_DUPLICADO") {
      return res.status(400).json({
        success: false,
        code: "MAIL_DUPLICADO",
        message: "El mail ya está registrado. ¿Olvidaste tu contraseña o querés iniciar sesión?",
      });
    } else if (errorMessage === "USUARIO_DUPLICADO") {
      return res.status(400).json({
        success: false,
        code: "USUARIO_DUPLICADO",
        message: "El nombre de usuario ya está en uso, por favor elige otro.",
      });
    } else if (errores) {
      return res.status(400).json({ success: false, errores });
    }

    return res.status(500).json({
      success: false,
      code: "ERROR_INTERNO",
      message: "Error al crear el usuario",
    });
  }
};

// Obtener usuario por ID
export async function getUsuarioById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID de usuario inválido"
      });
    }

    const usuario = await usuarioService.getUsuarioById(id);
    res.json({
      success: true,
      data: usuario 
    });
  } catch (error: any) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }
    next(error);
  }
}

// Actualizar usuario existente
export async function updateUsuario(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);

    if (req.file){
      req.body.fotoPerfil = `/uploads/${req.file.filename}`;
    }

    const updatedUsuario = await usuarioService.updateUsuario(id, req.body);
    res.json({ 
      success:true,
      message: 'Usuario actualizado exitosamente',
      data: updatedUsuario
    });
  } catch (error) {
    next(error);
  }
}

// Activar/desactivar usuario
export async function toggleUsuarioActivo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const { activo } = req.body;

    if (typeof activo !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: "El campo 'activo' debe ser un booleano"
      });
    }

    await usuarioService.toggleUsuarioActivo(id, activo);
    res.json({ 
      success: true,
      message: `Usuario ${activo ? 'activado' : 'desactivado'} exitosamente`
    });
  } catch (error) {
    next(error);
  }
}

// Eliminar usuario
export async function deleteUsuario(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await usuarioService.deleteUsuario(id);
    res.json({ 
      success:true,
      message:'Usuario eliminado'
     });
  } catch (error) {
    next(error);
  }
}

//Obtener lista de usuarios
export async function getAllUsuarios(req: Request, res: Response, next: NextFunction) {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json({
      success:true,
      data:usuarios
    });
  } catch (error) {
    next(error);
  }
}

//Obtener lista de usuarios postulantes
export async function getAllUsuariosPostulantes(req: Request, res: Response, next: NextFunction) {
  try {
    const usuariosPostulantes = await usuarioService.getAllUsuariosPostulantes();
    res.json({ 
      success:true,
      data:usuariosPostulantes
     });
  } catch (error) {
    next(error);
  }
}

//Obtener lista de usuarios empleadores
export async function getAllUsuariosEmpleadores(req: Request, res: Response, next: NextFunction) {
  try {
    const usuariosEmpleadores = await usuarioService.getAllUsuariosEmpleadores();
    res.json({ 
      success:true,
      data:usuariosEmpleadores
     });
  } catch (error) {
    next(error);
  }
}

// Obtener usuarios sugeridos 
export async function getUsuariosSugeridos(req: Request, res: Response, next: NextFunction) {
  try {
    const usuarioId = req.user?.id ?? 0;
    console.log("Usuario logueado ID:", usuarioId);
    
    if (!usuarioId) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado"
      });
    }

    const sugeridos = await usuarioService.getUsuariosSugeridos(usuarioId);
    res.json({
      success: true,
      data: sugeridos
    });
  } catch (error) {
    console.error("Error en getUsuariosSugeridos:", error);
    next(error);
  }
}

export async function loginUsuarioController(req: Request, res: Response) {
  const { mail, contraseña } = req.body;

  try {
    const result = await usuarioService.loginUsuario(mail, contraseña);

    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: result
    });

  } catch (err: any) {
    console.error("Error en login:", err);
    
    if (err.message === "USUARIO_DESACTIVADO") {
      return res.status(403).json({
        success: false,
        message: "USUARIO_DESACTIVADO"
      });
    }

    // Otros errores
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Error del servidor"
    });
  }
}

export async function recuperarContrasenaController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { mail } = req.body;

  try {
    const result = await usuarioService.recuperarContrasena(mail);
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error al procesar la recuperación",
    });
  }
}

export async function verificarCodigoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { mail, codigo } = req.body;

  try {
    const result = await usuarioService.verificarCodigo(mail, codigo);
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error al verificar el código",
    });
  }
}

export async function resetContrasenaController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token, nuevaContrasena } = req.body;

  try {
    const result = await usuarioService.resetContrasena(token, nuevaContrasena);
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error al restablecer la contraseña",
    });
  }
}
