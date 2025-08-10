import { Router } from 'express';
import * as ofertaController from '../controllers/oferta.controller';

const router = Router();

// Ruta para obtener todas las ofertas
router.get('/', ofertaController.getAllOfertas);

// Ruta para obtener una oferta por ID
router.get('/:id', ofertaController.getOfertaById);

// Ruta para crear una nueva oferta
router.post('/', ofertaController.createOferta);

// Ruta para actualizar una oferta existente
router.put('/:id', ofertaController.updateOferta);

// Ruta para eliminar una oferta
router.delete('/:id', ofertaController.deleteOferta);

// Ruta para obtener todas las ofertas de un empleador
router.get('/empleador/:id', ofertaController.getOfertasByEmpleadorId);

// Exportamos las rutas como "ofertaRoutes"
export const ofertaRoutes = router;
