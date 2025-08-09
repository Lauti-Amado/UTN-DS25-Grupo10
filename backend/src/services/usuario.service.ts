import {Usuario, CreateUsuarioRequest, UpdateUsuarioRequest, UsuarioResponse, 
       UsuariosListResponse } from '../types/usuarios.types';

// Lista falsa para probar datos si asi lo queremos
let usuarios: Usuario[] = [
  {
    id: 1,
    nombre: 'Yamil Tundis',
    contraseña: 'jdalsdjlsdjadl',
    mail: 'yamiltundis6@gmail.com',
    descripcion: 'Estoy en busca de mi primer empleo',
    rolPostulante: true,
    fecha: new Date('2004-10-07 T0:00:00'),
    fotoperfil: 'fotoPerfilYamil.png',
  },
  {
    id: 2,
    nombre: 'Julian Figueira',
    contraseña: 'jdalsdjlsdjadl',
    mail: 'julifigueroa@gmail.com',
    descripcion: 'Quiero sumar experiencia laboral',
    rolPostulante: true,
    fecha: new Date('2004-12-17 T00:00:00'),
    fotoperfil: 'fotoPerfilJulian.png',
  },
  {
    id: 3,
    nombre: 'Lautaro Amado',
    contraseña: 'jdalsdjlsdjadl',
    mail: 'lau@gmail.com',
    descripcion: 'Quiero sumar gente y capacitarla',
    rolPostulante: false,
    fecha: new Date('2004-09-05 T00:00:00'),
    fotoperfil: 'fotoPerfilLautaro.png',
  },
  {
    id: 4,
    nombre: 'Leo Piquet',
    contraseña: 'jdalsdjlsdjadl',
    mail: 'leonelpiquet@gmail.com',
    descripcion: 'En busca del mejor postulante',
    rolPostulante: false,
    fecha: new Date('2004-12-28 T00:00:00'),
    fotoperfil: 'fotoPerfilLeo.png',
  },
  {
    id: 5,
    nombre: 'Juan Caceres',
    contraseña: 'jdalsdjlsdjadl',
    mail: 'juancaceres@gmail.com',
    descripcion: 'En busca del mejor trabajo',
    rolPostulante: true,
    fecha: new Date('2004-12-31 T00:00:00'),
    fotoperfil: 'fotoPerfilJuan.png',
  },
];

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


// Eliminar oferta
export async function deleteUsuario(id: number): Promise<void> {
  const index = usuarios.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Usuario no encontrado');
  usuarios.splice(index, 1);
}
