import { Request, Response, NextFunction } from 'express';
import * as proyectoService from '../services/servicio_proyecto';
import { CreateProyectoRequest, UpdateProyectoRequest, ProyectoResponse, ProyectosListResponse, Proyecto } from '../types/proyectos.types';

// Obtener proyectos
export async function getAllProyectos(req: Request, res: Response<ProyectosListResponse>, next: NextFunction) {
  try {
    const ofertas = await proyectoService.getAllProyectos();
    res.json({ proyectos, total: ofertas.length });
  } catch (error) {
    next(error);
  }
}

// Obtener proyecto por ID
export async function getProyectoById(req: Request, res: Response<ProyectoResponse>, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const proyecto = await proyectoService.getProyectoById(id);
    res.json({ proyecto, message: "Oferta encontrada" });
  } catch (error) {
    next(error);
  }
}

// Crear nuevo proyecto
export async function createProyecto(
  req: Request<{}, ProyectoResponse, CreateProyectoRequest>,
  res: Response<ProyectoResponse>,
  next: NextFunction
) {
  try {
    const nueva = await proyectoService.createProyecto(req.body);
    res.status(201).json({ proyecto: nueva, message: "Oferta creada" });
  } catch (error) {
    next(error);
  }
}

// Actualizar proyecto existente
export async function updateProyecto(
  req: Request<{ id: string }, ProyectoResponse, UpdateProyectoRequest>,
  res: Response<ProyectoResponse>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updated = await proyectoService.updateProyecto(id, req.body);
    res.json({ proyecto: updated, message: "Proyecto actualizado" });
  } catch (error) {
    next(error);
  }
}

// Eliminar proyecto
export async function deleteProyecto(
  req: Request,
  res: Response<{ message: string }>,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await proyectoService.deleteProyecto(id);
    res.json({ message: "Proyecto eliminada" });
  } catch (error) {
    next(error);
  }
}
