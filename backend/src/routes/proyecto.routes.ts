import {Router} from 'express';
import * as proyectoController from '../controllers/proyecto.controller';
import { createProyectoSchema, updateProyectoSchema } from '../validations/proyecto.validation';
import {validate} from '../middlewares/validation.middleware';

const router = Router();

// GET /api/proyectos
router.get('/', proyectoController.getAllProyectos);

// GET/api/proectos/:id
router.get('/:id', proyectoController.getProyectoById);

//POST /api/proyectos
router.post('/', validate(createProyectoSchema), proyectoController.createProyecto);

// PUT /api/proyectos/:id
router.put('/:id',validate(updateProyectoSchema) , proyectoController.updateProyecto);

// DELETE /api/proyectos/:id
router.delete('/:id', proyectoController.deleteProyecto)

// Ruta para obtener todas los proyectos de un postulado
router.get('/postulado/:postuladoId', proyectoController.getProyectosByPostuladoId);

export const proyectoRouters = router;