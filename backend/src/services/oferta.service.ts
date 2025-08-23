import {
  CreateOfertaRequest,
  UpdateOfertaResquest,
  Oferta
} from '../types/ofertas.types';

// Lista con una oferta de prueba
let ofertas: Oferta[] = [
  {
    id: 1,
    categoria: 'Categoria 1',
    ubicacion: 'Ubicacion 1',
    sueldo: 50000,
    modalidad: 'remoto',
    horario: new Date()}],

    creador:[{
      id: 1,
      nombre: 'Creador 1',
      contraseña: 'contraseña1',
      mail: 'creador1@example.com',
      descripcion: 'Descripcion del creador 1',
      fecha: '1970-01-01T09:00:00', 
      logo: 'logo1.png'
    }],
    postulados: [{
        id: 2,
        nombre: 'Postulante 2',
        contraseña: 'contraseña2',
        mail: 'postulante2@example.com',
        descripcion: 'Descripcion del postulante 2',
        fechaNacimiento: '1970-01-01T09:00:00', 
        fotoperfil: 'foto2.png'
    }];

// Obtener todas las ofertas
export async function getAllOfertas(): Promise<Oferta[]> {
  return ofertas;
}

// Obtener oferta por ID
export async function getOfertaById(id: number): Promise<Oferta> {
  const oferta = ofertas.find(o => o.id === id);
  if (!oferta) throw new Error('Oferta no encontrada');
  return oferta;
}

// Crear nueva oferta
export async function createOferta(data: CreateOfertaRequest): Promise<Oferta> {
  const newOferta: Oferta = {
    id: Math.max(0, ...ofertas.map(o => o.id)) + 1,
    ...data
  };
  ofertas.push(newOferta);
  return newOferta;
}

// Actualizar oferta existente
export async function updateOferta(id: number, data: UpdateOfertaResquest): Promise<Oferta> {
  const index = ofertas.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Oferta no encontrada');
  ofertas[index] = { ...ofertas[index], ...data };
  return ofertas[index];
}

// Eliminar oferta
export async function deleteOferta(id: number): Promise<void> {
  const index = ofertas.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Oferta no encontrada');
  ofertas.splice(index, 1);
}
