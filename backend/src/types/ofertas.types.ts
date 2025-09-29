import { Formulario } from "../generated/prisma";
import { Usuario } from "./usuarios.types";

export interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  sueldo?: number;
  modalidad: TipoModalidad;
  horario: string;
  contacto: string;
  creador: Usuario;
}

type TipoModalidad = "presencial" | "remoto" | "hibrido";

export interface CreateOfertaRequest {
  titulo: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  sueldo?: number;
  modalidad: TipoModalidad;
  horario: string;
  contacto: string;
  creadorId: number;
  postuladoId: number[];
}

export interface UpdateOfertaResquest {
  titulo?: string;
  descripcion?: string;
  categoria?: string;
  ubicacion?: string;
  sueldo?: number;
  modalidad?: TipoModalidad;
  horario?: string;
  contacto?: string;
  postuladosIds?: number[];
}

export interface OfertaResponse {
  oferta: Oferta;
  message: string;
}

export interface OfertasListResponse {
  ofertas: Oferta[];
  total: number;
}
