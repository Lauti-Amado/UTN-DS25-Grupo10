import { Request, Response, NextFunction } from 'express';
import * as usuarioService from '../services/usuario';
import {CreateUsuarioRequest, UsuarioPostulanteListResponse, UsuarioPostulanteResponse, 
       UsuarioPostulante, UpdateUsuarioPostulanteRequest} from '../types/usuarios.types';


       //CONTROLLER DE POSTULANTES. FALTA DEFINIR FUNCIONES

// Crear Postulante
export async function getPostulantes(
  req: Request<{}, UsuarioPostulanteResponse, CreateUsuarioRequest>,
  res: Response<UsuarioPostulanteResponse>,
  next: NextFunction
) {
  try {
    const nueva = await usuarioService.createUsuarioPostulante(req.body);
    res.status(201).json({ usuario: nueva, message: "Usuario creado" });
  } catch (error) {
    next(error);
  }
}

// Actualizar usuario existente
export async function updateUsuarioPostulante(
  req: Request<{ id: string }, UsuarioPostulanteResponse, UpdateUsuarioPostulanteRequest>,
  res: Response<UsuarioPostulanteResponse>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updated = await usuarioService.updateUsuarioPostulante(id, req.body);
    res.json({ usuario: updated, message: "Usuario actualizado" });
  } catch (error) {
    next(error);
  }
}

//Obtener lista de postulantes
export async function getAllPostulantes(req: Request, res: Response<UsuarioPostulanteListResponse>, next: NextFunction) {
  try {
    const ofertas = await usuarioService.getAllPostulantes();
    res.json({ usuarios, total: usarios.length });
  } catch (error) {
    next(error);
  }
}
