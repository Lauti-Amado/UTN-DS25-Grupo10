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

- Ruta para obtener los formularios de una oferta (el id pertenece a la oferta):
  GET /formularios/:id
  
- Ruta para crear un formulario (el id pertenece a la oferta):
  POST /formulario/:id

> **Endpoints De Oferta**

- Ruta para obtener todas las ofertas:
  GET /ofertas

- Ruta para obtener una oferta por ID:
  GET /ofertas/:id

- Ruta para crear una nueva oferta:
  POST /ofertas

- Ruta para actualizar una oferta existente:
  PUT /ofertas/:id

- Ruta para eliminar una oferta:
  DELETE /ofertas/:id

- Ruta para obtener todas las ofertas de un empleador:
  GET /ofertas/empleador/:id

> **Endpoints De Proyecto**

- Ruta para obtener todos los proyectos:
  GET /proyectos

- Ruta para obtener un proyecto:
  GET /proyectos/:id

- Ruta para crear un proyecto:
  POST /proyectos/

- Ruta para actualizar un proyecto:
  PUT /proyectos/:id

- Ruta para eliminar un proyecto:
  DELETE /proyectos/:id

- Ruta para obtener todas los proyectos de un postulante:
  GET /proyectos/postulado/:postuladoId

> **Endpoints De Usuario**

- Ruta para obtener todos los usuarios:
  GET /usuarios

- Ruta para obtener un usuario por ID:
  GET /usuarios/:id

- Ruta para crear un usuario:
  POST /usuarios

- Ruta para actualizar un usuario existente:
  PUT /usuarios/:id

- Ruta para eliminar un usuario:
  DELETE /usuarios/:id

- Ruta para loguearse:
  POST /usuarios/login


- Ruta para obtener todos los usuarios POSTULANTES:
  GET /usuarios/particulares/p

- Ruta para obtener todos los usuarios EMPLEADORES:
  GET /usuarios/particulares/e

**COMENTARIOS:**

- Se documentaron los endpoints para validaciones y autenticación.
- Se uso zod para la validación de los endpoints mas importantes.
- El proyecto se encuentra escalable para futuras mejoras.

  
**TESTING:**

Archivo "usuario.service.test.ts". Aca se definieron dos tests
       Test 1: Debe retornar un usuario cuando existe. Prepara un usuario falso con el mockUser y llama a la función
               getUsuariobyId() para verificar que el resultado sea el usuario existente y llame bien a Prisma.
       Test 2: Simula que el findUnique usado en getUsuariobyId() no encontró a ningún usuario como el ingresado y si no lo encuentra, la función lanza el error con el                     mensaje "Usuario no encontrado"

Archivo "usuario.routes.test.ts". Acá se definieron dos tests
      Test 3: Se devuelve una lista de usuarios. En primera instancia, se define un usuario falso, el cual debe estar logueado
              y ser administrador. Dado queel usuario esté logueado y sea administrador, se pone a prueba la Api Get /usuarios, la cual debe devolver una lista de 
              usuarios (también falsos).
      Test 4: Se llama a la Api GET /usuarios/9999, la cual simula que el usuario con id 9999 no existe y por lo tanto verifica que la Api responda adecuadamente 
              con un error 404 y un mensaje de “Usuario no encontrado”.


  Estos tests pueden probarse con el comando "npm test"

