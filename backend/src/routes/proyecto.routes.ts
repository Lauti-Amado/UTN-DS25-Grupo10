import {Router} from 'express';
import * as proyectoController from '../controllers/proyecto.controller';

const router = Router();

// GET /api/Proyectos
router.get('/', proyectoController.getAllProyectos);

// GET/api/Proyectos/:id
router.get('/:id', proyectoController.getProyectoById);

//POST /api/Proyecto
router.post('/', proyectoController.createProyecto);

// PUT /api/Proyecto/:id
router.put('/:id', proyectoController.updateProyecto)

export const proyectoRouters = router;