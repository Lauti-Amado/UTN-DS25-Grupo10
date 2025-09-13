import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema } from '../validations/auth.validation';
const router = Router();
// Ruta públicas
router.post('/login',
validate(loginSchema),
authController.login
);
export const authRoutes = router;