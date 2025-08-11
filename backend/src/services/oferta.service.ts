import {  CreateOfertaRequest,  UpdateOfertaResquest,  Oferta } from '../types/ofertas.types';

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
  },
  
  {
    id: 2,
    categoria: 'Backend',
    ubicacion: 'La Plata',
    sueldo: 100000,
    modalidad: 'hibrido',
    horario: [new Date('2026-01-01T09:00:00')],

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
        ],
        total: 2
      }
    ]
  },
  {
    id: 3,
    categoria: 'Full-stack',
    ubicacion: 'Berazategui',
    sueldo: 50000,
    modalidad: 'presencial',
    horario: [new Date('2025-01-01T09:00:00')],

    creador:  {
      id: 4,
      nombre: 'Leo Piquet',
      contraseña: 'jdalsdjlsdjadl',
      mail: 'leonelpiquet@gmail.com',
      descripcion: 'En busca del mejor postulante',
      rolPostulante: false,
      fecha: new Date('2004-12-28 T00:00:00'),
      fotoperfil: 'fotoPerfilLeo.png',
    },

    postulados: [
      {
        usuarios: [
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
            id: 5,
            nombre: 'Juan Caceres',
            contraseña: 'jdalsdjlsdjadl',
            mail: 'juancaceres@gmail.com',
            descripcion: 'En busca del mejor trabajo',
            rolPostulante: true,
            fecha: new Date('2004-12-31 T00:00:00'),
            fotoperfil: 'fotoPerfilJuan.png',
          }
        ],
        total: 2
      }
    ]
  },
];

// Validación para creación de oferta, todos los campos obligatorios
function validarOfertaCreacion(data: CreateOfertaRequest) {
  if (!data.categoria || typeof data.categoria !== 'string') {
    throw new Error('La categoría es obligatoria y debe ser una cadena de texto');
  }
  if (typeof data.sueldo !== 'number' || data.sueldo <= 0) {
    throw new Error('El sueldo es obligatorio y debe ser un número mayor a cero');
  }
  if (!data.modalidad || typeof data.modalidad !== 'string') {
    throw new Error('La modalidad es obligatoria y debe ser una cadena de texto');
  }
  if (!data.creador) {
    throw new Error('El creador es obligatorio');
  }
  if (typeof data.creador.rolPostulante !== 'boolean') {
    throw new Error('El creador debe tener rolPostulante definido');
  }
  if (data.creador.rolPostulante) {
    throw new Error('El creador de la oferta debe ser un empleador (rolPostulante = false)');
  }
  if (data.postulados) {
    data.postulados.forEach(grupo => {
      if (!grupo.usuarios || !Array.isArray(grupo.usuarios)) {
        throw new Error('Los postulados deben tener un arreglo de usuarios');
      }
      grupo.usuarios.forEach(usuario => {
        if (usuario.rolPostulante !== true) {
          throw new Error(`El usuario "${usuario.nombre}" no es postulante y no puede postularse a una oferta`);
        }
      });
    });
  }
}

// Validación para actualización de oferta, campos opcionales
function validarOfertaUpdate(data: UpdateOfertaResquest) {
  if ('categoria' in data && (typeof data.categoria !== 'string' || !data.categoria)) {
    throw new Error('La categoría debe ser una cadena de texto no vacía');
  }
  if ('sueldo' in data && (typeof data.sueldo !== 'number' || data.sueldo <= 0)) {
    throw new Error('El sueldo debe ser un número mayor a cero');
  }
  if ('modalidad' in data && (typeof data.modalidad !== 'string' || !data.modalidad)) {
    throw new Error('La modalidad debe ser una cadena de texto no vacía');
  }

  if ('postulados' in data && data.postulados) {
    data.postulados.forEach(grupo => {
      if (!grupo.usuarios || !Array.isArray(grupo.usuarios)) {
        throw new Error('Los postulados deben tener un arreglo de usuarios');
      }
      grupo.usuarios.forEach(usuario => {
        if (usuario.rolPostulante !== true) {
          throw new Error(`El usuario "${usuario.nombre}" no es postulante y no puede postularse a una oferta`);
        }
      });
    });
  }
}


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
  validarOfertaCreacion(data);
  const newOferta: Oferta = {
    id: ofertas.length > 0 ? Math.max(...ofertas.map(o => o.id)) + 1 : 1,
    ...data,
  };
  ofertas.push(newOferta);
  return newOferta;
}

// Actualizar oferta existente
export async function updateOferta(id: number, data: UpdateOfertaResquest): Promise<Oferta> {
  const index = ofertas.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Oferta no encontrada');

  validarOfertaUpdate(data);

  ofertas[index] = { ...ofertas[index], ...data };
  return ofertas[index];
}

// Obtener todas las ofertas de un empleador
export async function getOfertasByEmpleadorId(empleadorId: number): Promise<Oferta[]> {
  return ofertas.filter(o => o.creador.id === empleadorId);
}

// Eliminar oferta
export async function deleteOferta(id: number): Promise<void> {
  const index = ofertas.findIndex(o => o.id === id);
  if (index === -1) throw new Error('Oferta no encontrada');
  ofertas.splice(index, 1);
}
