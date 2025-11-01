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
import prisma from './config/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
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

// ===== MANEJO DE CIERRE GRACEFUL =====
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} recibido, cerrando servidor...`);
  
  try {
    await prisma.$disconnect();
    console.log('✅ Conexión a base de datos cerrada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cerrando conexiones:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', async (error) => {
  console.error('❌ Uncaught Exception:', error);
  await prisma.$disconnect();
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  await prisma.$disconnect();
  process.exit(1);
});

// Levantar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { app, server };