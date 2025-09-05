import { Router } from 'express';
import * as usuarioController from '../controllers/usuario.controller';
import { createProyectoSchema, updateProyectoSchema } from '../validations/proyecto.validation';
import {validate} from '../middlewares/validation.middleware';
import { createUsuarioSchema, updateUsuarioSchema } from '../validations/usuario.validations';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', usuarioController.getUsuarioById);

// Ruta para crear un usuario
router.post('/', validate(createUsuarioSchema),usuarioController.createUsuario);

// Ruta para actualizar un usuario existente
router.put('/:id', validate(updateProyectoSchema), usuarioController.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuarioController.deleteUsuario);

router.post('/login', usuarioController.loginUsuarioController);


// Ruta para obtener todos los usuarios
router.get('/particulares/p', usuarioController.getAllUsuariosPostulantes);

router.get('/particulares/e', usuarioController.getAllUsuariosEmpleadores);

// Exportamos las rutas como "usuarioRoutes"
export const usuarioRoutes = router;