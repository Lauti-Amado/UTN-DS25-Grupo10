import { Request, Response, NextFunction } from 'express';
import * as formularioService from '../services/formulario.service';

// Trae todos los formularios de una oferta especifica (esto solo puede visualizarlo el empleador creador)
export async function getFormulariosByOferta (req: Request, res: Response, next: NextFunction){
    try {
      const id = parseInt(req.params.ofertaId)
      const formularios = await formularioService.getFomulariosByOferta(id);
      res.json({ success: true, data:formularios })
    } catch (error) {
      next(error);
    }
}

// Permite crear un formulario para una oferta especifica (esto solo puede realizarlo un postulante interesado)
export async function createFormulario( req: Request, res: Response, next: NextFunction) {
  try {
    const nuevoFormulario = await formularioService.createFormulario(req.body);
    res.status(201).json({ success:true, data:nuevoFormulario, message: "Formulario creado" });
  } catch (error) {
    next(error);
  }
}

// Estas son las unicas funcionalidades respecto a los formularios ya que no tiene sentido eliminar un formulario, 
// tampoco actualizarlo (una vez mandado asi lo recibirá el empleador creador) ni tampoco traerlos todos (se obtendria
// informacion de formularios de ofertas de otro usuario y no es algo lógico)