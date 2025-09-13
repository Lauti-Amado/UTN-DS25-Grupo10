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

//Obtener usuario por ID
export async function getUsuarioById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const usuario = await usuarioService.getUsuarioById(id);
    res.json({success:true,
      data:usuario });
  } catch (error) {
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
    const updatedUsuario = await usuarioService.updateUsuario(id, req.body);
    res.json({ 
      success:true,
      message: 'Proyecto actualizado exitosamente', data:updatedUsuario
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
    console.error(err);
    return res.status(err?.statusCode || 500).json({
      success: false,
      message: err?.message || "Error del servidor"
    });
  }
}


