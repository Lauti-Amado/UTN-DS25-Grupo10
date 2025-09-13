import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { LoginResponse } from '../types/auth.types';

export async function login(req: Request, res: Response<LoginResponse>, next: NextFunction) {
  try {
    const result = await authService.login(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
