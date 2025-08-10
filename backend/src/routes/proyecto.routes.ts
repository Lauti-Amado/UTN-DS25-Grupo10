import {Router} from 'express';
import * as proyectoController from '../controllers/proyecto.controller';

const router = Router();

// GET /api/proyectos
router.get('/', proyectoController.getAllProyectos);

// GET/api/proectos/:id
router.get('/:id', proyectoController.getProyectoById);

//POST /api/proyectos
router.post('/', proyectoController.createProyecto);

// PUT /api/proyectos/:id
router.put('/:id', proyectoController.updateProyecto);

// DELETE /api/proyectos/:id
router.delete('/:id', proyectoController.deleteProyecto)

export const proyectoRouters = router;