**DESCRIPCIÓN:**
Este backend fue desarrollado con Node.JS y se encarga de manejar la logica de negocio de RoDi, la comunicación con la base de datos y la exposición de los endpoints a través de una API REST. 

**OBJETIVO:**
El objetivo principal del backend es implementar las funcionalidades de la gestión de usuarios, proyectos, ofertas y formularios.

- Usuarios: personas que vayan a interactuar con el software diferenciandose por postulantes y empleadores.
- Proyectos: se crean a partir de la necesidad de los postulantes de mostrar sus conocimientos y experiencia.
- Ofertas: se crean a partir de la necesidad de los empleadores de reclutar postulantes para un trabajo específico.
- Formularios: actúan en forma de documentación formal entre una oferta de trabajo y un postulante interesado.

**ENDPOINTS:**

> **Endpoints De Formulario**

//Ruta para obtener los formularios de una oferta
router.get('/:id', formularioController.getFormulariosByOferta);

//Ruta para crear un formulario
router.post('/:id', validate(createFormularioSchema), formularioController.createFormulario);

> **Endpoints De Oferta**

// Ruta para obtener todas las ofertas
router.get('/', ofertaController.getAllOfertas);

// Ruta para obtener una oferta por ID
router.get('/:id', ofertaController.getOfertaById);

// Ruta para crear una nueva oferta
router.post('/', validate(createOfertaSchema),ofertaController.createOferta);

// Ruta para actualizar una oferta existente
router.put('/:id', validate(updateOfertaSchema), ofertaController.updateOferta);

// Ruta para eliminar una oferta
router.delete('/:id', ofertaController.deleteOferta);

// Ruta para obtener todas las ofertas de un empleador
router.get('/empleador/:empleadorId', ofertaController.getOfertasByEmpleadorId);

> **Endpoints De Proyecto**

// GET /api/proyectos
router.get('/', proyectoController.getAllProyectos);

// GET/api/proectos/:id
router.get('/:id', proyectoController.getProyectoById);

//POST /api/proyectos
router.post('/', validate(createProyectoSchema), proyectoController.createProyecto);

// PUT /api/proyectos/:id
router.put('/:id',validate(updateProyectoSchema) , proyectoController.updateProyecto);

// DELETE /api/proyectos/:id
router.delete('/:id', proyectoController.deleteProyecto)

// Ruta para obtener todas los proyectos de un postulado
router.get('/postulado/:postuladoId', proyectoController.getProyectosByPostuladoId);

> **Endpoints De Usuario**

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', usuarioController.getUsuarioById);

// Ruta para crear un usuario
router.post('/', validate(createUsuarioSchema),usuarioController.createUsuario);

// Ruta para actualizar un usuario existente
router.put('/:id', validate(updateUsuarioSchema), usuarioController.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuarioController.deleteUsuario);

router.post('/login', usuarioController.loginUsuarioController);


// Ruta para obtener todos los usuarios
router.get('/particulares/p', usuarioController.getAllUsuariosPostulantes);

router.get('/particulares/e', usuarioController.getAllUsuariosEmpleadores);

**COMENTARIOS:**

- Se documentaron los endpoints para validaciones y autenticación.
- Se uso zod para la validación de los endpoints mas importantes.
- El proyecto se encuentra escalable para futuras mejoras.


