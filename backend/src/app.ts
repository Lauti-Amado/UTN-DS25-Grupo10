import express from 'express';
import { ofertaRoutes } from './routes/oferta.routes';
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

// Middleware de errores
app.use(handleError);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
