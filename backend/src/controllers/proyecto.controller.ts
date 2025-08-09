
import {Request, Response, NextFunction} from 'express';
import { Proyecto, CreateProyectoRequest, UpdateProyectoRequest, 
ProyectoResponse, ProyectosListResponse } from '../types/proyectos.types';
import * as ProyectoService from '../services/proyecto.service';

export async function getAllProyectos(req: Request, res: 
Response<ProyectosListResponse>, next: NextFunction) {
  try {
    const proyectos = await ProyectoService.getAllProyectos();
    res.json({
      proyectos,
      total: proyectos.length
    });
  } catch (error) {
    next(error);
  }
}
export async function getProyectoById(req: Request, res: 
Response<ProyectoResponse>, next: NextFunction) {
  try {
    const { id } = req.params;
    const proyecto = await ProyectoService.getProyectoById(parseInt(id));
    res.json({
      proyecto,
      message: 'Proyecto encontrado'
    });
  } catch (error) {
    next(error);
  }
} 


//apartir de aca hace BRISA

export async function createBook(
   req: Request<{}, BookResponse, CreateBookRequest>,
   res: Response<BookResponse>,
   next: NextFunction
) {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json({
      book: newBook,
      message: 'Book created successfully'
    });
  } catch (error) {
    next(error);
  }
}
export async function updateBook(
  req: Request<{ id: string }, BookResponse , UpdateBookRequest >,
  res: Response<BookResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const updatedBook = await 
bookService.updateBook(parseInt(id), req.body);
    res.json({
      book: updatedBook,
      message: 'Book updated successfully'
    });
  } catch (error) {
    next(error);
  }
}
  Controller .
