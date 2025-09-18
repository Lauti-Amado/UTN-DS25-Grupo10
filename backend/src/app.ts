import express from 'express';
import { ofertaRoutes } from './routes/oferta.routes';
import cors from 'cors';
import dotenv from  'dotenv';
import { usuarioRoutes } from './routes/usuario.routes';
import { proyectoRouters } from './routes/proyecto.routes';
import { formularioRoutes } from './routes/formulario.routes';
import { authRoutes } from './routes/auth.routes';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const PORT = 3000;

const corsOptions={
  origin:process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeader: ['Content-Type', 'Authorization']
};

// Middleware para JSON
app.use(cors(corsOptions));
app.use(express.json());

// Middleware log
app.use(logRequest);

// Rutas públicas
app.use('/auth', authRoutes);

// Rutas
app.use('/ofertas', ofertaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/proyectos', proyectoRouters);
app.use('/formularios', formularioRoutes);

// Middleware de errores
app.use(handleError);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
