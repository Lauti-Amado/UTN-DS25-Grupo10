import { Request, Response, NextFunction } from 'express';
import * as usuarioService from '../services/usuario.service';

// Crear Usuario
export async function createUsuario(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUsuario = await usuarioService.createUsuario(req.body);
    res.status(201).json({
      success:true,
      message: 'Proyecto creado', data:newUsuario
     });
  } catch (error) {
    next(error);
  }
}

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
