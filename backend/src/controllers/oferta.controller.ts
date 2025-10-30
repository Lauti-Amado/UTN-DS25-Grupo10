import { Request, Response, NextFunction } from 'express';
import * as ofertaService from '../services/oferta.service';

// Obtener todas las ofertas
export async function getAllOfertas(req: Request, res: Response, next: NextFunction) {
  try {
    const ofertas = await ofertaService.getAllOfertas();
    res.json({ success: true, data: ofertas });
  } catch (error) {
    next(error);
  }
}

// Obtener oferta por ID
export async function getOfertaById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const oferta = await ofertaService.getOfertaById(id);
    res.json({ success:true, data:oferta });
  } catch (error) {
    next(error);
  }
}

// Crear nueva oferta
export async function createOferta( req: Request, res: Response, next: NextFunction) {
  try {
    const nueva = await ofertaService.createOferta(req.body);
    res.status(201).json({ success:true, data:nueva, message: "Oferta creada" });
  } catch (error) {
    next(error);
  }
}

// Actualizar oferta existente
export async function updateOferta( req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const updated = await ofertaService.updateOferta(id, req.body);
    res.json({ success:true, data:updated, message: "Oferta actualizada" });
  } catch (error) {
    next(error);
  }
}

// Obtener todas las ofertas de un empleador especifico por ID
export async function getOfertasByEmpleadorId( req: Request, res: Response, next: NextFunction) {
  try {
    const empleadorId = parseInt(req.params.empleadorId);
    const ofertas = await ofertaService.getOfertasByEmpleadorId(empleadorId);
    res.json({ success: true, data: ofertas });
  } catch (error) {
    next(error);
  }
}

// Eliminar oferta
export async function deleteOferta(
  req: Request,
  res: Response<{ message: string }>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await ofertaService.deleteOferta(id);
    res.json({ message: "Oferta eliminada" });
  } catch (error) {
    next(error);
  }
}

export async function getFormularios( req: Request, res: Response, next: NextFunction) {
  try {
    const ofertaId = parseInt(req.params.ofertaId);
    const formularios = await ofertaService.getFormularios(ofertaId);
    res.json({ success: true, data: formularios})
  } catch (error) {
    next(error);
  }
}
