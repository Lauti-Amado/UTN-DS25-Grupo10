import {
  CreateOfertaRequest,
  UpdateOfertaResquest,
  Oferta
} from '../types/ofertas.type';

// Lista falsa para probar datos si asi lo queremos
let ofertas: Oferta[] = [];

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
