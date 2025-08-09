import {UsuarioEmpleador, UpdateUsuarioEmpleadorRequest, 
        UsuarioEmpleadorResponse, UsuarioEmpleadorListResponpose, 
        CreateUsuarioRequest} from '../types/usuarios.types';

// Lista falsa para probar datos si asi lo queremos
let usuarios: Usuario[] = [];

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




// Actualizar un empleado
export async function updateUsuarioEmpleador(id: number, data: UpdateUsuarioEmpleadorRequest): Promise<UsuarioEmpleador> {
  const index = usuarios.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Usuario no encontrado');
  usuarios[index] = { ...usuarios[index], ...data };
  return usuarios[index];
}
