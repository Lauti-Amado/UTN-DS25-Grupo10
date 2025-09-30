import { Formulario } from "../generated/prisma";
import { Usuario } from "./usuarios.types";

export interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  sueldo?: string;
  modalidad: TipoModalidad;
  horario: string;
  contacto: string;
  logo?: string;
  creador: Usuario;
}

type TipoModalidad = "presencial" | "remoto" | "hibrido";

export interface CreateOfertaRequest {
  titulo: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  sueldo?: string;
  modalidad: TipoModalidad;
  horario: string;
  contacto: string;
  logo?: String;
  creadorId: number;
}

export interface UpdateOfertaResquest {
  titulo?: string;
  descripcion?: string;
  categoria?: string;
  ubicacion?: string;
  sueldo?: string;
  modalidad?: TipoModalidad;
  horario?: string;
  contacto?: string;
  logo?: string;
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
