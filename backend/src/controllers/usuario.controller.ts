import { Request, Response, NextFunction } from 'express';
import * as usuarioService from '../services/usuario.service';
import {CreateUsuarioRequest, UpdateUsuarioRequest, UsuarioResponse, 
       UsuariosListResponse, UsuarioPostulantesListResponse, UsuarioEmpleadoresListResponse} from '../types/usuarios.types';


//CONTROLLER DE POSTULANTES. FALTA DEFINIR FUNCIONES

// Crear Postulante
export async function createUsuario(
  req: Request<{}, UsuarioResponse, CreateUsuarioRequest>,
  res: Response<UsuarioResponse>,
  next: NextFunction
) {
  try {
    const nueva = await usuarioService.createUsuario(req.body);
    res.status(201).json({ usuario: nueva, message: "Usuario creado" });
  } catch (error) {
    next(error);
  }
}

//Obtener usuario por ID
export async function getUsuarioById(req: Request, res: Response<UsuarioResponse>, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const usuario = await usuarioService.getUsuarioById(id);
    res.json({ usuario, message: "Usuario encontrada" });
  } catch (error) {
    next(error);
  }
}

// Actualizar usuario existente
export async function updateUsuario(
  req: Request<{ id: string }, UsuarioResponse, UpdateUsuarioRequest>,
  res: Response<UsuarioResponse>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updated = await usuarioService.updateUsuario(id, req.body);
    res.json({ usuario: updated, message: "Usuario actualizado" });
  } catch (error) {
    next(error);
  }
}

// Eliminar usuario
export async function deleteUsuario(
  req: Request,
  res: Response<{ message: string }>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await usuarioService.deleteUsuario(id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    next(error);
  }
}



//Obtener lista de usuarios
export async function getAllUsuarios(req: Request, res: Response<UsuariosListResponse>, next: NextFunction) {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json({ usuarios, total: usuarios.length });
  } catch (error) {
    next(error);
  }
}

//Obtener lista de usuarios postulantes
export async function getAllUsuariosPostulantes(req: Request, res: Response<UsuarioPostulantesListResponse>, next: NextFunction) {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json({ usuarios, total: usuarios.length });
  } catch (error) {
    next(error);
  }
}

//Obtener lista de usuarios empleadores
export async function getAllUsuariosEmpleadores(req: Request, res: Response<UsuarioEmpleadoresListResponse>, next: NextFunction) {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json({ usuarios, total: usuarios.length });
  } catch (error) {
    next(error);
  }
}
