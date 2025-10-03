export interface Formulario {
    nombre: string,
    apellido: string,
    localidad: string,
    pais: string,
    genero: string,
    descripcion: string,
    curriculum: string,
}

export interface CreateFormularioRequest {
    nombre: string,
    apellido: string,
    localidad: string,
    pais: string,
    genero: string,
    descripcion: string,
    curriculum: string,
    ofertaId: number,
    postuladoId: number,
}

export interface FormularioResponse {
    formulario: Formulario,
    message: string,
}

export interface FormulariosListResponse {
    formularios: Formulario[],
    total: number,
}