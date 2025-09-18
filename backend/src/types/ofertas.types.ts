import { Formulario } from "../generated/prisma";
import { Usuario } from "./usuarios.types";

export interface Oferta {
  id: number;
  categoria: string;
  ubicacion: string;
  sueldo?: number;
  modalidad: TipoModalidad;
  horario: string;
  creador: Usuario;
}

type TipoModalidad = "presencial" | "remoto" | "hibrido";

export interface CreateOfertaRequest {
  categoria: string;
  ubicacion: string;
  sueldo?: number;
  modalidad: TipoModalidad;
  horario: string;
  creadorId: number;
  postuladoId: number[];
}

export interface UpdateOfertaResquest {
  categoria?: string;
  ubicacion?: string;
  sueldo?: number;
  modalidad?: TipoModalidad;
  horario?: string;
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
