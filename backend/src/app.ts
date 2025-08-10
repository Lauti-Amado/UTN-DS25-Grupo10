import express from 'express';
import { ofertaRoutes } from './routes/oferta.routes';
import { usuarioRoutes } from './routes/usuario.routes';
import { proyectoRouters } from './routes/proyecto.routes';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';

const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Middleware log
app.use(logRequest);

// Rutas
app.use('/ofertas', ofertaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/proyectos', proyectoRouters);

// Middleware de errores
app.use(handleError);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
