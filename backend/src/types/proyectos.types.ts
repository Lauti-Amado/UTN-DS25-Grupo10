import { Usuario } from "./usuarios.types";

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  tecnologiasUsadas: string[];
  createdAt: Date;
  creador: Usuario;
}

export interface CreateProyectoRequest {
  nombre: string;
  descripcion: string;
  tecnologiasUsadas: string[];
  creadorId: number;
}

export interface UpdateProyectoRequest {
  nombre?: string;
  descripcion?: string;
  tecnologiasUsadas?: string[];
}

export interface ProyectoResponse {
  proyecto: Proyecto;
  message: string;
}

export interface ProyectosListResponse {
  proyectos: Proyecto[];
  total: number;
}
