export interface Usuario {
    id: number;
    contraseña: string;
    mail: string;
    rolPostulante: boolean;
}

// Crear un usuario. Acepta tanto para crear un postulante como a un empleador
export interface CreateUsuarioRequest {
    nombre: string;
    contraseña: string;
    mail: string;
    rolPostulante: boolean;
}

export interface UpdateUsuarioRequest {
    nombre?: string;
    contraseña?: string;
    mail?: string;
}

export interface UsuarioResponse {
    usuario: Usuario;
    message: string;
}

export interface UsuariosListResponse {
    usuarios: Usuario[];
    total: number;
}

export interface UsuarioPostulantesListResponse {
    usuarios: Usuario[];
    total: number;
}

export interface UsuarioEmpleadoresListResponse {
    usuarios: Usuario[];
    total: number;
}
