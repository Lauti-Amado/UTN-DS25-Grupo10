
import { Usuario, UsuariosListResponse } from "./usuarios.types"

export interface Oferta {
    id: number;
    categoria: string;
    ubicacion: string;
    sueldo?: number;
    modalidad: TipoModalidad;
    horario: Date[];
    creador: Usuario;
    postulados: UsuariosListResponse[];
}

type TipoModalidad = 'presencial' | 'remoto' | 'hibrido'

export interface CreateOfertaRequest {
    categoria: string;
    ubicacion: string;
    sueldo?: number;
    modalidad: TipoModalidad;
    horario: Date[];
    creador: Usuario;
    postulados: UsuariosListResponse[];
}

export interface UpdateOfertaResquest {
    categoria?: string;
    ubicacion?: string;
    sueldo?: number;
    modalidad?: TipoModalidad;
    horario?: Date[];
    postulados?: UsuariosListResponse[];
}

export interface OfertaResponse {
    oferta: Oferta;
    message: string;
}

export interface OfertasListResponse {
    ofertas: Oferta[];
    total: number;
}
