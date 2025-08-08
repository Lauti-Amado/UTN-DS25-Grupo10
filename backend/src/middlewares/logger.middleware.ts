import { Request, Response, NextFunction } from 'express';

// Middleware que muestra cada request recibido
export function logRequest(req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  console.log(`[${timestamp}] 📥 ${method} ${url}`);
  next();
}
