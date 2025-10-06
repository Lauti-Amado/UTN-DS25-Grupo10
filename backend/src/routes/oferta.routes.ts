
import { Router } from 'express';
import * as ofertaController from '../controllers/oferta.controller';
import { createOfertaSchema, updateOfertaSchema } from '../validations/oferta.validation';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

// Ruta para obtener todas las ofertas
router.get('/', ofertaController.getAllOfertas);

// Ruta para obtener todas las ofertas de un empleador
router.get('/empleador/:empleadorId', ofertaController.getOfertasByEmpleadorId);

// Ruta para obtener una oferta por ID
router.get('/:id', ofertaController.getOfertaById);

// Ruta para crear una nueva oferta
router.post('/', validate(createOfertaSchema), ofertaController.createOferta);

// Ruta para actualizar una oferta existente
router.put('/:id', validate(updateOfertaSchema), ofertaController.updateOferta);

// Ruta para eliminar una oferta
router.delete('/:id', ofertaController.deleteOferta);

// Ruta para obtener todos los formularios de una oferta
router.get('/:ofertaId/formularios', ofertaController.getFormularios);

// Exportamos las rutas como "ofertaRoutes"
export const ofertaRoutes = router;
