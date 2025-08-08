import { Request, Response, NextFunction } from 'express';

// Middleware que agarra errores y devuelve respuesta
export function handleError(err: any, req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ❌ Error: ${err.message}`);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp
  });
}
