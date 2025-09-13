import {Request, Response, NextFunction } from 'express';
import * as proyectoService from '../services/proyecto.service';

// Obtener todos los proyectos
export async function getAllProyectos(req: Request, res: 
Response, next: NextFunction) {
  try {
    const proyectos = await proyectoService.getAllProyectos();
    res.json({
      success:true,
      data:proyectos
    });
  } catch (error) {
    next(error);
  }
}
// Obtener proyecto por ID
export async function getProyectoById(req: Request, res: 
Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const proyecto = await proyectoService.getProyectoById(id);
    res.json({
      success:true,
      data:proyecto
    });
  } catch (error) {
    next(error);
  }
} 

// Crear nuevo proyecto
export async function createProyecto(
   req: Request, res: Response, next: NextFunction
) {
  try {
    const newProyecto = await proyectoService.createProyecto(req.body);
    res.status(201).json({
      success:true,
      message: 'Proyecto creado', data:newProyecto
    });
  } catch (error) {
    next(error);
  }
}

// Actualizar proyecto existente
export async function updateProyecto(
  req: Request, res: Response, next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updatedProyecto = await proyectoService.updateProyecto(id, req.body);
    res.json({
      success:true,
      message: 'Proyecto actualizado exitosamente', data:updatedProyecto
    });
  } catch (error) {
    next(error);
  }
}

// Obtener todos los proyectos de un postulado específico
export async function getProyectosByPostuladoId(
  req: Request, res: Response, next: NextFunction
) {
  try {
    const postuladoId = parseInt(req.params.postuladoId);
    const proyectos = await proyectoService.getProyectosByPostuladoId(postuladoId);
    res.json({ success:true,
      data:proyectos });
  } catch (error) {
    next(error);
  }
}


// Eliminar proyecto
export async function deleteProyecto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await proyectoService.deleteProyecto(id);
    res.json({success:true,
      message:'Libro eliminado'
      });
     } catch (error) {
    next(error);
  }
}