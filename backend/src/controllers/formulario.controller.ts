
import { Request, Response, NextFunction } from 'express';
import * as formularioService from '../services/formulario.service';

// Trae todos los formularios de una oferta especifica (esto solo puede visualizarlo el empleador creador)
export async function getFormulariosByOferta (req: Request, res: Response, next: NextFunction){
    try {
      const id = parseInt(req.params.id);
      const formularios = await formularioService.getFormulariosByOferta(id);
      res.json({ success: true, data:formularios })
    } catch (error) {
      next(error);
    }
}

// Trae true si ese usuario ya se postuló a esa oferta y false si es que no
export async function getExistePostulacion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const UsuarioId = parseInt(req.params.UsuarioId);
    const OfertaId = parseInt(req.params.OfertaId);

    // Validación rápida
    if (isNaN(UsuarioId) || isNaN(OfertaId)) {
      return res.status(400).json({ existe: false, mensaje: 'IDs inválidos' });
    }

    const existe = await formularioService.getExistePostulacion(UsuarioId, OfertaId);

    // Siempre devolver un objeto con la propiedad "existe"
    res.json({ existe });
  } catch (error) {
    console.error("Error backend getExistePostulacion:", error);
    // Nunca enviar error 500 sin JSON, devolvemos false
    res.status(200).json({ existe: false });
  }
}

// Permite crear un formulario para una oferta especifica (esto solo puede realizarlo un postulante interesado)
export async function createFormulario( req: Request, res: Response, next: NextFunction) {
  try {
    console.log("LLEGA AL CONTROLADOR");
     // Logs para depuración
    console.log('BODY recibido:', req.body);
    console.log('FILE recibido:', req.file);
    console.log('PARAMS recibidos:', req.params);

     // Validar que se subió un archivo
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Debes subir un curriculum", errores: ["Debes subir un curriculum"] });
    }

    //obtenemos ofertaId desde la ruta /:id (mas robusto)
    const ofertaIdFromParam = Number(req.params.id);
    const ofertaIdFromBody = req.body.ofertaId ? Number(req.body.ofertaId) : undefined;
    const postuladoIdFromBody = req.body.postuladoId ? Number(req.body.postuladoId) : undefined;

    //validaciones básicas
    const isPostuladoInvalido = !postuladoIdFromBody || isNaN(postuladoIdFromBody);
    const isOfertaInvalida =
      (!ofertaIdFromParam && !ofertaIdFromBody) ||
      (ofertaIdFromBody !== undefined && isNaN(ofertaIdFromBody));

    if (isPostuladoInvalido || isOfertaInvalida) {
      return res.status(400).json({ message: "postuladoId u/ofertaId inválido" });
    }

    // Construir el objeto con los datos correctos
    const data = {
      ...req.body,
      ofertaId: !isNaN(ofertaIdFromParam) ? ofertaIdFromParam : ofertaIdFromBody,
      postuladoId: postuladoIdFromBody,
      curriculum: req.file.filename,
    };

    console.log("DAT que se enviará al service:", data);

    const nuevoFormulario = await formularioService.createFormulario(data);
    res.status(201).json({ success:true, data:nuevoFormulario, message: "Formulario creado" });
  } catch (error) {
    next(error);
  }
}

export async function contratarPostulante (req: Request, res: Response, next: NextFunction) {
  try {
      const UsuarioId = parseInt(req.params.usuarioId);
      const OfertaId = parseInt(req.params.ofertaId);
      const updated = await formularioService.contratarPostulante(UsuarioId, OfertaId);
      res.json({ success:true, data:updated, message: "Felicitaciones por encontrar al postulante adecuado!" });
    } catch (error) {
      next(error);
    }
}

// Estas son las unicas funcionalidades respecto a los formularios ya que no tiene sentido eliminar un formulario, 
// tampoco actualizarlo (una vez mandado asi lo recibirá el empleador creador) ni tampoco traerlos todos (se obtendria
// informacion de formularios de ofertas de otro usuario y no es algo lógico)