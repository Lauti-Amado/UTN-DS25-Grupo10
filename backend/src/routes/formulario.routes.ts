import { Router } from 'express';
import * as formularioController from '../controllers/formulario.controller';
import { createFormularioSchema } from '../validations/formulario.validation';
import { validate } from '../middlewares/validation.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router()

//Ruta para obtener los formularios de una oferta
router.get('/:id', formularioController.getFormulariosByOferta);

//Ruta para crear un formulario
router.post('/:id', validate(createFormularioSchema), formularioController.createFormulario);

router.post('/:id', upload.single('curriculum'),validate(createFormularioSchema), formularioController.createFormulario);

// con "/:id" me refiero al id de la oferta 
export const formularioRoutes = router;

