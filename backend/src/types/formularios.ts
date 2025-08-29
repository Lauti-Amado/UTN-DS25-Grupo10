
export interface Formulario {
    id: number,
    nombre: String,
    apellido: String,
    localidad: String,
    pais: String,
    genero: String,
    descripcion: String,
    curriculum: String,
}

export interface CreateFormularioRequest {
    nombre: String,
    apellido: String,
    localidad: String,
    pais: String,
    genero: String,
    descripcion: String,
    curriculum: String,
}

export interface FormularioResponse {
    formulario: Formulario,
    message: String,
}

export interface FormulariosListResponse {
    formularios: Formulario[],
    total: number,
}