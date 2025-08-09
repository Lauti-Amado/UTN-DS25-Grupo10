import {Usuario, CreateUsuarioRequest, UpdateUsuarioRequest, UsuarioResponse, 
       UsuariosListResponse } from '../types/usuarios.types';

// Lista falsa para probar datos si asi lo queremos
let usuarios: Usuario[] = [];

// Obtener todos los usuarios
export async function getAllUsuarios(): Promise<Usuario[]> {
  return usuarios;
}


//Obtener todos los usuarios postulantes
export async function getAllUsuariosPostulantes(): Promise<Usuario[]> {
  const usuariopostulante = usuarios.filter(o => o.rolPostulante === true);
  if (!usuariopostulante) throw new Error('Usuario no encontrado');
  return usuariopostulante;
}


//Obtener todos los usuarios empleadores
export async function getAllUsuariosEmpleadores(): Promise<Usuario[]> {
  const usuarioempleador = usuarios.filter(o => o.rolPostulante === false);
  return usuarioempleador;
}


// Obtener usuario por ID
export async function getUsuarioById(id: number): Promise<Usuario> {
  const usuario = usuarios.find(o => o.id === id);
  if (!usuario) throw new Error('Usuario no encontrado');
  return usuario;
}

// Crear un nuevo usuario
export async function createUsuario(data: CreateUsuarioRequest): Promise<Usuario> {
  const newUsuario: Usuario = {
    id: Math.max(0, ...usuarios.map(o => o.id)) + 1,
    ...data
  };
  usuarios.push(newUsuario);
  return newUsuario;
}


// Actualizar un usuario
export async function updateUsuario(id: number, data: UpdateUsuarioRequest): Promise<Usuario> {
  const index = usuarios.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Usuario no encontrado');
  usuarios[index] = { ...usuarios[index], ...data };
  return usuarios[index];
}
