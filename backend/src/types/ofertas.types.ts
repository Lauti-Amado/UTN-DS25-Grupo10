import { UsuarioPostulante, UsuarioEmpleador } from "./usuarios.types"

export interface Oferta {
    categoria: string,
    ubicacion: string,
    sueldo?: number,
    modalidad: TipoModalidad,
    horario: Date[],
    creador: UsuarioEmpleador,
    postulados: UsuarioPostulante[]

}

type TipoModalidad = 'presencial' | 'remoto' | 'hibrido'