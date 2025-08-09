import { Request, Response, NextFunction } from 'express';
import * as usuarioService from '../services/usuario';
import {UsuarioEmpleador, UpdateUsuarioEmpleadorRequest, 
        UsuarioEmpleadorResponse, UsuarioEmpleadorListResponpose, CreateUsuarioRequest} from '../types/usuarios.types';


       //CONTROLLER DE POSTULANTES. FALTA DEFINIR FUNCIONES

// Crear Postulante
export async function getEmpleador(
  req: Request<{}, UsuarioEmpleadorResponse, CreateUsuarioRequest>,
  res: Response<UsuarioEmpleadorResponse>,
  next: NextFunction
) {
  try {
    const nueva = await usuarioService.createUsuarioEmpleador(req.body);
    res.status(201).json({ usuario: nueva, message: "Usuario creado" });
  } catch (error) {
    next(error);
  }
}

// Actualizar usuario existente
export async function updateUsuarioEmpleador(
  req: Request<{ id: string }, UsuarioEmpleadorResponse, UpdateUsuarioEmpleadorRequest>,
  res: Response<UsuarioEmpleadorResponse>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updated = await usuarioService.updateUsuarioEmpleador(id, req.body);
    res.json({ usuario: updated, message: "Usuario actualizado" });
  } catch (error) {
    next(error);
  }
}

//Obtener lista de postulantes
export async function getAllEmpleador(req: Request, res: Response<UsuarioEmpleadorListResponpose>, next: NextFunction) {
  try {
    const ofertas = await usuarioService.getAllEmpleador();
    res.json({ usuarios, total: usarios.length });
  } catch (error) {
    next(error);
  }
}
