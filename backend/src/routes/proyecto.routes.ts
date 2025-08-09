import {Router} from 'express';
import * as proyectoController from '../controllers/proyecto.controller';

const router = Router();

// GET /api/Proyectos
router.get('/', proyectoController.getAllProyectos);

// GET/api/Proyectos/:id
router.get('/:id', proyectoController.getProyectoId);

//POST /api/Proyecto

// PUT /api/Proyecto/:id

export const proyectoRouters = router;