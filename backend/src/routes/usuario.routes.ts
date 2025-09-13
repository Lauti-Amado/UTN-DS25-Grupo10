import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller";
import { validate } from "../middlewares/validation.middleware";
import { createUsuarioSchema, updateUsuarioSchema } from "../validations/usuario.validations";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", usuarioController.loginUsuarioController);

// Rutas protegidas
router.get("/", authenticate, authorize("ADMIN"), usuarioController.getAllUsuarios);
router.get("/:id", authenticate, authorize("ADMIN"), usuarioController.getUsuarioById);
router.post("/", validate(createUsuarioSchema), usuarioController.createUsuario);
router.put("/:id", validate(updateUsuarioSchema), usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);

router.get("/particulares/p", authenticate, authorize("ADMIN"), usuarioController.getAllUsuariosPostulantes);
router.get("/particulares/e", authenticate, authorize("ADMIN"), usuarioController.getAllUsuariosEmpleadores);

export const usuarioRoutes = router;
