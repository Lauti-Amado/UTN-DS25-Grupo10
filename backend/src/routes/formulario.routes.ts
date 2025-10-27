
import { Router } from 'express';
import * as formularioController from '../controllers/formulario.controller';
import { createFormularioSchema, updateFormularioSchema} from '../validations/formulario.validation';
import { validate } from '../middlewares/validation.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router()

//Ruta para obtener los formularios de una oferta
router.get('/:id', formularioController.getFormulariosByOferta);

// Ruta para crear un formulario (con multer para archivos)
router.post('/:id', upload.single('curriculum'), validate(createFormularioSchema), formularioController.createFormulario);

// Ruta para consultar si un usuario postulante ya se postuló o no a una oferta
router.get('/:UsuarioId/:OfertaId', formularioController.getExistePostulacion);

// Ruta para contratar un postulante (modifica el atributo "contratado" del formulario en cuestion)
router.put('/:usuarioId/:ofertaId', formularioController.contratarPostulante)

// con "/:id" me refiero al id de la oferta 
export const formularioRoutes = router;

