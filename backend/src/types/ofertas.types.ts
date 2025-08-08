
import { UsuarioPostulante, UsuarioEmpleador } from "./usuarios.types"

export interface Oferta {
    id: number;
    categoria: string;
    ubicacion: string;
    sueldo?: number;
    modalidad: TipoModalidad;
    horario: Date[];
    creador: UsuarioEmpleador;
    postulados: UsuarioPostulante[];
}

type TipoModalidad = 'presencial' | 'remoto' | 'hibrido'

export interface CreateOfertaRequest {
    categoria: string;
    ubicacion: string;
    sueldo?: number;
    modalidad: TipoModalidad;
    horario: Date[];
    creador: UsuarioEmpleador;
    postulados: UsuarioPostulante[];
}

export interface UpdateOfertaResquest {
    categoria?: string;
    ubicacion?: string;
    sueldo?: number;
    modalidad?: TipoModalidad;
    horario?: Date[];
    postulados?: UsuarioPostulante[];
}

export interface OfertaResponse {
    oferta: Oferta;
    message: string;
}

export interface OfertasListResponse {
    ofertas: Oferta[];
    total: number;
}
