export interface Usuario {
    id: number;
    contraseña: string;
    nombre: string;
    mail: string;
    rolPostulante: boolean;
    nombreUsuario: string;
    fotoPerfil?: string | null;
    fechaNacimiento?: Date | null;
    descripcion?: string | null;
}

// Crear un usuario. Acepta tanto para crear un postulante como a un empleador
export interface CreateUsuarioRequest {
    nombre: string;
    contraseña: string;
    mail: string;
    rolPostulante: boolean;
    nombreUsuario: string;
    fotoPerfil?: string | null;
    fechaNacimiento?: Date | null;
    descripcion?: string | null;
}

export interface UpdateUsuarioRequest {
    nombre?: string;
    contraseña?: string;
    mail?: string;
    nombreUsuario?: string;
    fotoPerfil?: string | null;
    fechaNacimiento?: Date | null;
    descripcion?: string | null;
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
