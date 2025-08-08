
export interface UsuarioPostulante {
    nombre: string,
    contraseña: string,
    mail: string,
    descripcion: string,
    fechaNacimiento: Date,
    fotoperfil: string,
}

export interface UsuarioEmpleador {
    nombre: string,
    contraseña: string,
    mail: string,
    descripcion: string,
    fechaCreacion: Date,
    logo: string,
}

type Usuario = UsuarioEmpleador | UsuarioPostulante

export interface CreateUsuarioRequest {
    usuario: Usuario,
}