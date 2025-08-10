
import {Request, Response, NextFunction} from 'express';
import { Proyecto, CreateProyectoRequest, UpdateProyectoRequest, 
ProyectoResponse, ProyectosListResponse } from '../types/proyectos.types';
import * as proyectoService from '../services/proyecto.service';

// Obtener todos los proyectos
export async function getAllProyectos(req: Request, res: 
Response<ProyectosListResponse>, next: NextFunction) {
  try {
    const proyectos = await proyectoService.getAllProyectos();
    res.json({
      proyectos,
      total: proyectos.length
    });
  } catch (error) {
    next(error);
  }
}
// Obtener proyecto por ID
export async function getProyectoById(req: Request, res: 
Response<ProyectoResponse>, next: NextFunction) {
  try {
    const { id } = req.params;
    const proyecto = await proyectoService.getProyectoById(parseInt(id));
    res.json({
      proyecto,
      message: 'Proyecto encontrado'
    });
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
    const newProyecto = await proyectoService.createProyecto(req.body);
    res.status(201).json({
      proyecto: newProyecto,
      message: 'Proyecto creado'
    });
  } catch (error) {
    next(error);
  }
}

// Actualizar proyecto existente
export async function updateProyecto(
  req: Request<{ id: string }, ProyectoResponse , UpdateProyectoRequest >,
  res: Response<ProyectoResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const updatedProyecto = await proyectoService.updateProyecto(parseInt(id), req.body);
    res.json({
      proyecto: updatedProyecto,
      message: 'Proyecto updated successfully'
    });
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
    const { id } = req.params;
    await proyectoService.deleteProyecto(parseInt(id));
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    next(error);
  }
}