// service/oferta.service.ts
import {
  CreateOfertaRequest,
  UpdateOfertaResquest,
  Oferta
} from '../types/ofertas.types';

// Lista de ofertas de prueba
let ofertas: Oferta[] = [
  {
    id: 1,
    categoria: 'Categoria 1',
    ubicacion: 'Ubicacion 1',
    sueldo: 50000,
    modalidad: 'remoto',
    horario: [new Date('1970-01-01T09:00:00')],

    creador: {
      id: 3,
      nombre: 'Lautaro Amado',
      contraseña: 'jdalsdjlsdjadl',
      mail: 'lau@gmail.com',
      descripcion: 'Quiero sumar gente y capacitarla',
      rolPostulante: false,
      fecha: new Date('2004-09-05T00:00:00'),
      fotoperfil: 'fotoPerfilLautaro.png',
    },

    postulados: [
      {
        usuarios: [
          {
            id: 1,
            nombre: 'Yamil Tundis',
            contraseña: 'jdalsdjlsdjadl',
            mail: 'yamiltundis6@gmail.com',
            descripcion: 'Estoy en busca de mi primer empleo',
            rolPostulante: true,
            fecha: new Date('2004-10-07T00:00:00'),
            fotoperfil: 'fotoPerfilYamil.png',
          }
        ],
        total: 1
      }
    ]
  }
];

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
