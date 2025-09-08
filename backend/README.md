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

- Ruta para obtener los formularios de una oferta (el id pertenece a la oferta)
  GET /formularios/:id
  
- Ruta para crear un formulario (el id pertenece a la oferta)
  POST /formulario/:id

> **Endpoints De Oferta**

- Ruta para obtener todas las ofertas
  GET /ofertas

- Ruta para obtener una oferta por ID
  GET /ofertas/:id

- Ruta para crear una nueva oferta
  POST /ofertas

- Ruta para actualizar una oferta existente
  PUT /ofertas/:id

- Ruta para eliminar una oferta
  DELETE /ofertas/:id

- Ruta para obtener todas las ofertas de un empleador
  GET /ofertas/empleador/:id

> **Endpoints De Proyecto**

- Ruta para obtener todos los proyectos
  GET /proyectos

- Ruta para obtener un proyecto
  GET /proyectos/:id

- Ruta para crear un proyecto
  POST /proyectos/

- Ruta para actualizar un proyecto
  PUT /proyectos/:id

- Ruta para eliminar un proyecto
  DELETE /proyectos/:id

- Ruta para obtener todas los proyectos de un postulante
  GET /proyectos/postulado/:postuladoId

> **Endpoints De Usuario**

- Ruta para obtener todos los usuarios
  GET /usuarios

- Ruta para obtener un usuario por ID
  GET /usuarios/:id

- Ruta para crear un usuario
  POST /usuarios

- Ruta para actualizar un usuario existente
  PUT /usuarios/:id

- Ruta para eliminar un usuario
  DELETE /usuarios/:id

- Ruta para loguearse
  POST /usuarios/login


- Ruta para obtener todos los usuarios POSTULANTES
  GET /usuarios/particulares/p

- Ruta para obtener todos los usuarios EMPLEADORES
  GET /usuarios/particulares/e

**COMENTARIOS:**

- Se documentaron los endpoints para validaciones y autenticación.
- Se uso zod para la validación de los endpoints mas importantes.
- El proyecto se encuentra escalable para futuras mejoras.


