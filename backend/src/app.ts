import express from 'express';
import { ofertaRoutes } from './routes/oferta.routes';
import cors from 'cors';
import dotenv from  'dotenv';
import { usuarioRoutes } from './routes/usuario.routes';
import { proyectoRouters } from './routes/proyecto.routes';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const PORT = 3000;

const corsOptions={
  origin:process.env.FRONTEND_URL || 'http://localhost:5173/',
  credentials:true
};

// Middleware para JSON
app.use(cors(corsOptions));
app.use(express.json());

// Middleware log
app.use(logRequest);
// === ENDPOINT DE PRUEBA POST /test ===
app.post('/test', (req, res) => {
  console.log("POST /test recibido con body:", req.body); // esto aparece en la consola del backend
  res.json({
    success: true,
    mensaje: "Backend recibe POST correctamente",
    datosRecibidos: req.body
  });
});


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
