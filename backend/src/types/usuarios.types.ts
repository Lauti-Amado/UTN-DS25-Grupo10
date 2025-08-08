
export interface UsuarioPostulante {
    id: number;
    nombre: string;
    contraseña: string;
    mail: string;
    descripcion: string;
    fechaNacimiento: Date;
    fotoperfil: string;
}

export interface UsuarioEmpleador {
    id: number;
    nombre: string;
    contraseña: string;
    mail: string;
    descripcion: string;
    fechaCreacion: Date;
    logo: string;
}



// Con esto defino que un usuario puede ser empleador o postulante
type Usuario = UsuarioEmpleador | UsuarioPostulante



// Crear un usuario. Acepta tanto para crear un postulante como a un empleador
export interface CreateUsuarioRequest {
    usuario: Usuario;
}


// Formato de las request y response de los usuarios postulantes
export interface UpdateUsuarioPostulanteRequest {
    nombre?: string;
    contraseña?: string;
    mail?: string;
    descripcion?: string;
    fechaNacimiento?: Date;
    fotoperfil?: string;
}

export interface UsuarioPostulanteResponse {
    usuario: UsuarioPostulante;
    message: string;
}

export interface UsuarioPostulanteListResponse {
    usuarios: UsuarioPostulante[];
    total: number;
}



// Formato de las request y response de los usuarios empleadores
export interface UpdateUsuarioEmpleadorRequest {
    nombre?: string;
    contraseña?: string;
    mail?: string;
    descripcion?: string;
    fechaCreacion?: Date;
    logo?: string;
}

export interface UsuarioEmpleadorResponse {
    usuario: UsuarioEmpleador;
    message: string;
}
export interface UsuarioEmpleadorListResponpose {   
    usuarios: UsuarioEmpleador[];
    total: number;
}

// Retorna usuarios sin importar si son empleadores o postulantes
export interface UsuariosListResponse {
    usuarios: Usuario[];
    total: number;
}