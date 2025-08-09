import {UsuarioEmpleador, UpdateUsuarioEmpleadorRequest, 
        UsuarioEmpleadorResponse, UsuarioEmpleadorListResponpose, 
        CreateUsuarioRequest} from '../types/usuarios.types';

// Lista falsa para probar datos si asi lo queremos
let usuarios: UsuarioEmpleador[] = [];

// Obtener todos los empleadores
export async function getAllEmpleador(): Promise<UsuarioEmpleador[]> {
  return usuarios;
}

// Obtener empleado por ID
export async function getEmpleadobyId(id: number): Promise<UsuarioEmpleador> {
  const usuario = usuarios.find(o => o.id === id);
  if (!usuario) throw new Error('Usuario no encontrado');
  return usuario;
}

// Crear un nuevo empleado
export async function createOferta(data: CreateUsuarioRequest): Promise<UsuarioEmpleador> {
  const newId = usuarios.length > 0
    ? Math.max(...usuarios.map(o => o.id)) + 1
    : 1;

  const { id, ...usuarioSinId } = data.usuario as UsuarioEmpleador;

   const newUsuarioEmpleador: UsuarioEmpleador = {
   id: newId,
   ...usuarioSinId
   };

  usuarios.push(newUsuarioEmpleador);
  return newUsuarioEmpleador;
}



// Actualizar un empleado
export async function updateUsuarioEmpleador(id: number, data: UpdateUsuarioEmpleadorRequest): Promise<UsuarioEmpleador> {
  const index = usuarios.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Usuario no encontrado');
  usuarios[index] = { ...usuarios[index], ...data };
  return usuarios[index];
}
