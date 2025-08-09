import { Router } from 'express';
import * as usuario_Controller from '../controllers/usuario_controller';

const router = Router();

// Ruta para obtener todos los usuarios postulantes
router.get('/', usuario_Controller.getAllPostulantes);

// Ruta para obtener una oferta por ID
router.get('/:id', usuario_Controller.getUsuarioById);

// Ruta para crear una usuario existentes
router.post('/', usuario_Controller.createUsuario);

// Ruta para actualizar un usuario existente
router.put('/:id', usuario_Controller.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuario_Controller.deleteUsuario);

// Exportamos las rutas como "ofertaRoutes"
export const ofertaRoutes = router;

///////////


// Ruta para obtener todos los usuarios empleadores
router.get('/', usuario_Controller.getAllEmpleadores);