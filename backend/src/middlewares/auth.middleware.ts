import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        rolPostulante: boolean;
      };
    }
  }
}

// Middleware de autenticación
export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      rolPostulante: decoded.rolPostulante
    };

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "Token expirado" });
    }
    res.status(401).json({ success: false, error: "Token inválido" });
  }
}

// Middleware de autorización por rol
export function authorize(...roles: ("POSTULANTE" | "EMPLEADOR")[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: "No autenticado" });
    }

    const roleFromUser = req.user.rolPostulante ? "POSTULANTE" : "EMPLEADOR";

    if (!roles.includes(roleFromUser)) {
      return res.status(403).json({ success: false, error: "No tienes permisos" });
    }

    next();
  };
}
