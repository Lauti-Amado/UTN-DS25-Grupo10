import express from 'express';
import { ofertaRoutes } from './routes/oferta.routes';
import { usuarioRoutes } from './routes/usuario.routes';
import { proyectoRouters } from './routes/proyecto.routes';
import { formularioRoutes } from './routes/formulario.routes';
import { authRoutes } from './routes/auth.routes';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

// CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(logRequest);

// ---- RUTAS API ----
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/ofertas', ofertaRoutes);
app.use('/proyectos', proyectoRouters);
app.use('/formularios', formularioRoutes);

// ---- SERVIR FRONTEND ----
app.use(express.static(path.join(process.cwd(), 'dist')));

app.use((req, res, next) => {
  const apiPaths = ['/auth', '/usuarios', '/ofertas', '/proyectos', '/formularios'];
  if (apiPaths.some(path => req.path.startsWith(path))) {
    return next();
  }
  res.sendFile(path.join(process.cwd(), 'frontend', 'index.html'));
});

// Middleware de errores
app.use(handleError);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export { app };
