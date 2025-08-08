import { Request, Response, NextFunction } from 'express';
import * as ofertaService from '../services/oferta.service';
import { CreateProyectoRequest, UpdateOfertaResquest, OfertaResponse, OfertasListResponse } from '../types/proyectos.types';

// Obtener todas las ofertas
export async function getAllOfertas(req: Request, res: Response<OfertasListResponse>, next: NextFunction) {
  try {
    const ofertas = await ofertaService.getAllOfertas();
    res.json({ ofertas, total: ofertas.length });
  } catch (error) {
    next(error);
  }
}

// Obtener oferta por ID
export async function getOfertaById(req: Request, res: Response<OfertaResponse>, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const oferta = await ofertaService.getOfertaById(id);
    res.json({ oferta, message: "Oferta encontrada" });
  } catch (error) {
    next(error);
  }
}

// Crear nueva oferta
export async function createOferta(
  req: Request<{}, OfertaResponse, CreateOfertaRequest>,
  res: Response<OfertaResponse>,
  next: NextFunction
) {
  try {
    const nueva = await ofertaService.createOferta(req.body);
    res.status(201).json({ oferta: nueva, message: "Oferta creada" });
  } catch (error) {
    next(error);
  }
}

// Actualizar oferta existente
export async function updateOferta(
  req: Request<{ id: string }, OfertaResponse, UpdateOfertaResquest>,
  res: Response<OfertaResponse>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updated = await ofertaService.updateOferta(id, req.body);
    res.json({ oferta: updated, message: "Oferta actualizada" });
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
