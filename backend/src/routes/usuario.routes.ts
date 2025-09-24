import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller";
import { validate } from "../middlewares/validation.middleware";
import { createUsuarioSchema, updateUsuarioSchema } from "../validations/usuario.validations";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post("/login", usuarioController.loginUsuarioController);

// Rutas protegidas
router.get("/", authenticate, authorize(["POSTULANTE", "ADMIN", "EMPLEADOR"]), usuarioController.getAllUsuarios);
router.get("/:id", authenticate, authorize(["POSTULANTE", "ADMIN", "EMPLEADOR"]), usuarioController.getUsuarioById);
router.post("/", validate(createUsuarioSchema), usuarioController.createUsuario);
router.put("/:id", upload.single('fotoPerfil'), validate(updateUsuarioSchema), usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);

router.get("/particulares/p", authenticate, authorize(["POSTULANTE", "ADMIN", "EMPLEADOR"]), usuarioController.getAllUsuariosPostulantes);
router.get("/particulares/e", authenticate, authorize(["POSTULANTE", "ADMIN", "EMPLEADOR"]), usuarioController.getAllUsuariosEmpleadores);

export const usuarioRoutes = router;
