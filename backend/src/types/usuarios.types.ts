export interface Usuario {
    id: number;
    nombre: string;
    contraseña: string;
    mail: string;
    descripcion: string;
    rolPostulante: boolean;
    fecha: Date;
    fotoperfil: string;
}

// Crear un usuario. Acepta tanto para crear un postulante como a un empleador
export interface CreateUsuarioRequest {
    nombre: string;
    contraseña: string;
    mail: string;
    descripcion: string;
    rolPostulante: boolean;
    fecha: Date;
    fotoperfil: string;
}

export interface UpdateUsuarioRequest {
    nombre?: string;
    contraseña?: string;
    mail?: string;
    descripcion?: string;
    fecha?: Date;
    fotoperfil?: string;
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
