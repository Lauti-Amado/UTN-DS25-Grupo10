import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller";
import { validate } from "../middlewares/validation.middleware";
import { createUsuarioSchema, updateUsuarioSchema } from "../validations/usuario.validations";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

// Rutas públicas
router.post("/login", usuarioController.loginUsuarioController);
router.post("/", validate(createUsuarioSchema), usuarioController.createUsuario);

router.get("/sugeridos", authenticate, usuarioController.getUsuariosSugeridos);
router.get("/particulares/p", authenticate, authorize("ADMIN"), usuarioController.getAllUsuariosPostulantes);
router.get("/particulares/e", authenticate, authorize("ADMIN"), usuarioController.getAllUsuariosEmpleadores);

router.get("/", authenticate, usuarioController.getAllUsuarios);
router.get("/:id", authenticate, usuarioController.getUsuarioById);
router.put("/:id", authenticate, upload.single('fotoPerfil'), validate(updateUsuarioSchema), usuarioController.updateUsuario);
router.delete("/:id", authenticate, authorize("ADMIN"), usuarioController.deleteUsuario);
router.post("/recuperar", usuarioController.recuperarContrasenaController);
router.post("/reset-password", usuarioController.resetContrasenaController);
router.post("/verificar-codigo", usuarioController.verificarCodigoController);



export const usuarioRoutes = router;