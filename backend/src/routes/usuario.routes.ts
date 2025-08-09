import { Router } from 'express';
import * as usuarioController from '../controllers/usuario.controller';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', usuarioController.getUsuarioById);

// Ruta para crear un usuario
router.post('/', usuarioController.createUsuario);

// Ruta para actualizar un usuario existente
router.put('/:id', usuarioController.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuarioController.deleteUsuario);

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getAllUsuariosPostulantes);

router.get('/', usuarioController.getAllUsuariosEmpleadores);

// Exportamos las rutas como "usuarioRoutes"
export const usuarioRoutes = router;