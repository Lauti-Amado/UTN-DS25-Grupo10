import { Router } from 'express';
import * as usuario_Controller from '../controllers/usuario_controller';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', usuario_Controller.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', usuario_Controller.getUsuarioById);

// Ruta para crear un usuario
router.post('/', usuario_Controller.createUsuario);

// Ruta para actualizar un usuario existente
router.put('/:id', usuario_Controller.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuario_Controller.deleteUsuario);

// Ruta para obtener todos los usuarios
router.get('/', usuario_Controller.getAllUsuariosPostulantes);

router.get('/', usuario_Controller.getAllUsuariosEmpleadores);

// Exportamos las rutas como "ofertaRoutes"
export const ofertaRoutes = router;

///////////
