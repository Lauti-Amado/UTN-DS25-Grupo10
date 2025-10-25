//src/componentes/acordion.jsx
import React, { useState, useEffect, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useLocation } from 'react-router-dom';
import './acordion.css';
import { DatosContexto } from '../datosContext.jsx';
import datosEmpleosIniciales from './datosIniciales';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal } from 'react-bootstrap';
import { IoIosPaper } from "react-icons/io";
import FormularioPostulacionModal from './FormularioPostulacionModal';
import PostuladosModal from './PostuladosModal';
import NotificacionModal from './NotificacionModal';
import { ofertaSchema } from '../validations/oferta.js'; 
import { API_URL } from '../config.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function Acordion() {
  const location = useLocation();
  const s = location.state?.mensaje;
  const { busquedaGlobal, usuarioLogueado } = useContext(DatosContexto);

  const [modalVisible, setModalVisible] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [items, setItems] = useState(() => {
    const datosGuardados = localStorage.getItem('empleos');
    if (datosGuardados) return JSON.parse(datosGuardados);
    localStorage.setItem('empleos', JSON.stringify(datosEmpleosIniciales));
    return datosEmpleosIniciales;
  });

  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarPostulados, setMostrarModalPostulados] = useState(false);
  const [idOfertaSeleccionada, setIdOfertaSeleccionada] = useState(null);
  // Estado para trackear postulaciones del usuario
  const [postulaciones, setPostulaciones] = useState({}); // Objeto { [ofertaId]: true/false }

  // Estados para edición
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ofertaEditando, setOfertaEditando] = useState(null);

  // Estados para notificaciones
  const [notificacion, setNotificacion] = useState({ show: false, titulo: '', mensaje: '', tipo: 'success' });

  useEffect(() => {
    localStorage.setItem('empleos', JSON.stringify(items));
  }, [items]);

    // 🔎 Filtro por búsqueda global
    const itemsFiltrados = items.filter((item) => {
    const titulo = (item.titulo || '').toLowerCase();
    const descripcion = (item.descripcion || '').toLowerCase();
    const busqueda = (busquedaGlobal || '').toLowerCase();

    return titulo.includes(busqueda) || descripcion.includes(busqueda);
  });


  
  // Limpia el formulario y resetea estados de edición
  const limpiarFormulario = () => {
  setModoEdicion(false);
  setOfertaEditando(null);
  // El reset del formulario se hará desde useForm (abajo)
};

  // Muestra una notificación modal
  const mostrarNotificacion = (titulo, mensaje, tipo = 'success') => {
    setNotificacion({ show: true, titulo, mensaje, tipo });
  };


  
  //traigo las ofertas del backend 
  // Cargar ofertas desde la base de datos del usuario logueado

  useEffect(() => {
  if (!usuarioLogueado) return;

  // Función para chequear si el usuario ya se postuló a una oferta
// Función para chequear si el usuario ya se postuló a una oferta
const checkPostulacion = async (usuarioId, ofertaId) => {
  try {
    const res = await fetch(`${API_URL}/formularios/${usuarioId}/${ofertaId}`);
    if (!res.ok) {
      console.warn(`checkPostulacion fallo para oferta ${ofertaId} con status ${res.status}`);
      return false;
    }
    const data = await res.json();
    console.log(`checkPostulacion - ofertaId ${ofertaId}:`, data);
    return data.existe ?? false;
  } catch (err) {
    console.error(`Error en checkPostulacion oferta ${ofertaId}:`, err);
    return false;
  }
};

// Función principal para traer ofertas y sus postulaciones
const fetchOfertas = async () => {
  try {
    const endpoint = usuarioLogueado.rolPostulante
      ? `${API_URL}/ofertas`
      : `${API_URL}/ofertas/empleador/${usuarioLogueado.id}`;

    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Error al obtener ofertas: ${res.status}`);
    const data = await res.json();

    let ofertasArray = [];
    if (Array.isArray(data)) {
      ofertasArray = data;
    } else if (data.success && Array.isArray(data.data)) {
      ofertasArray = data.data;
    } else {
      console.warn("Formato inesperado de ofertas:", data);
      setItems([]);
      return;
    }

    setItems(ofertasArray);

    if (usuarioLogueado.rolPostulante) {
      // Verificar postulaciones del usuario con manejo de errores individuales
      const resultados = await Promise.all(
        ofertasArray.map(async (item) => {
          try {
            const existe = await checkPostulacion(usuarioLogueado.id, item.id);
            return [item.id, existe];
          } catch (err) {
            console.error(`Error individual al checkear postulacion oferta ${item.id}:`, err);
            return [item.id, false];
          }
        })
      );

      const nuevasPostulaciones = Object.fromEntries(resultados);
      console.log("Postulaciones cargadas correctamente:", nuevasPostulaciones);
      setPostulaciones(nuevasPostulaciones);
    }
  } catch (err) {
    console.error("Error al cargar ofertas:", err);
    setNotificacion({
      show: true,
      titulo: 'Error',
      mensaje: 'No se pudieron cargar las ofertas.',
      tipo: 'error'
    });
  }
};

fetchOfertas();
}, [usuarioLogueado]);



  // Maneja el envío del formulario para crear o editar una oferta
  const onSubmit = async (data) => {
  const ofertaData = {
    ...data,
    creadorId: usuarioLogueado.id,
    // Convertir campos vacíos a undefined si es necesario
    sueldo: data.sueldo || undefined,
    modalidad: data.modalidad || undefined,
    logo: data.logo || undefined,
  };

  try {
    let response;
    if (modoEdicion && ofertaEditando) {
      // EDITAR
      response = await fetch(`${API_URL}/ofertas/${ofertaEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ofertaData),
      });
    } else {
      // CREAR
      response = await fetch(`${API_URL}/ofertas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ofertaData),
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al guardar la oferta');
    }

    const result = await response.json();
    const nuevaOferta = result.data;

    if (modoEdicion) {
      setItems((prev) => prev.map(item => item.id === ofertaEditando.id ? nuevaOferta : item));
      mostrarNotificacion('Éxito', 'Oferta actualizada correctamente', 'success');
    } else {
      setItems((prev) => [...prev, nuevaOferta]);
      mostrarNotificacion('Éxito', 'Oferta creada correctamente', 'success');
    }

    // Cerrar y limpiar
    setMostrarFormulario(false);
    limpiarFormulario();
    reset(); // Limpiar el formulario de react-hook-form
  } catch (err) {
    console.error(err);
    mostrarNotificacion('Error', err.message || 'No se pudo completar la operación', 'error');
  }
};

  const confirmarEliminar = (id) => {
    setIdAEliminar(id);
    setMostrarModal(true);
  };

  const verPostulados = (id) => {
    setIdOfertaSeleccionada(id);
    setMostrarModalPostulados(true);
  };


  const eliminarConfirmado = () => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== idAEliminar));
    fetch(`${API_URL}/ofertas/${idAEliminar}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Error al eliminar la oferta del backend');
        mostrarNotificacion('Eliminado', 'La oferta se eliminó correctamente', 'success');
      })
      .catch((err) => {
        console.error(err);
        mostrarNotificacion('Error', 'No se pudo eliminar la oferta', 'error');
      });

    setMostrarModal(false);
    setIdAEliminar(null);
  };

  const iniciarEdicion = (item) => {
  setModoEdicion(true);
  setOfertaEditando(item);
  setMostrarFormulario(true);
  // ✅ El formulario se llenará automáticamente gracias al useEffect + reset()
};

  const cancelarFormulario = () => {
    limpiarFormulario();
    setMostrarFormulario(false);
  };

  const handlePostular = async (item) => {
  setEmpresaSeleccionada(item);
  setModalVisible(true);

  // Actualizamos badge después de postular
  if (usuarioLogueado?.rolPostulante) {
    try {
      const res = await fetch(`${API_URL}/formularios/${usuarioLogueado.id}/${item.id}`);
      if (!res.ok) throw new Error('Error al verificar postulacion');
      const data = await res.json();
      setPostulaciones(prev => ({ ...prev, [item.id]: data.existe }));
    } catch (err) {
      console.error(err);
    }
  }
};

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
} = useForm({
  resolver: yupResolver(ofertaSchema),
  mode: 'onChange',
  defaultValues: {
    titulo: '',
    descripcion: '',
    categoria: '',
    ubicacion: '',
    sueldo: '',
    modalidad: '',
    horario: '',
    contacto: '',
    logo: ''
  },
});


  return (
    <div className="container mt-4">
      {usuarioLogueado?.rolPostulante === false && (
        <>
          <button
            className="btn-toggle-formulario mb-3"
            onClick={() => {
              if (mostrarFormulario) {
                cancelarFormulario();
              } else {
                setMostrarFormulario(true);
              }
            }}>
            <i className={`bi ${mostrarFormulario ? 'bi-dash-circle' : 'bi-plus-circle'}`}></i>
            {mostrarFormulario 
              ? ' Cancelar' 
              : modoEdicion 
                ? ' Editar Oferta' 
                : ' Agregar Nueva Oferta'}
          </button>

          {mostrarFormulario && (
            <div className="formulario-oferta">
              <h5 className="mb-3">
                {modoEdicion ? (
                  <>
                    <i className="bi bi-pencil-square me-2"></i>
                    Editar Oferta
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle me-2"></i>
                    Nueva Oferta
                  </>
                )}
              </h5>
              <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
  {/* Título */}
  <div className="mb-2">
    <input
      type="text"
      className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
      placeholder="Título del empleo *"
      {...register('titulo')}
    />
    {errors.titulo && <div className="invalid-feedback">{errors.titulo.message}</div>}
  </div>

  {/* Descripción */}
  <div className="mb-2">
    <textarea
      className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
      placeholder="Descripción del empleo *"
      rows="3"
      {...register('descripcion')}
    />
    {errors.descripcion && <div className="invalid-feedback">{errors.descripcion.message}</div>}
  </div>

  {/* Categoría */}
  <div className="mb-2">
    <input
      type="text"
      className={`form-control ${errors.categoria ? 'is-invalid' : ''}`}
      placeholder="Categoría *"
      {...register('categoria')}
    />
    {errors.categoria && <div className="invalid-feedback">{errors.categoria.message}</div>}
  </div>

  {/* Ubicación */}
  <div className="mb-2">
    <input
      type="text"
      className={`form-control ${errors.ubicacion ? 'is-invalid' : ''}`}
      placeholder="Ubicación *"
      {...register('ubicacion')}
    />
    {errors.ubicacion && <div className="invalid-feedback">{errors.ubicacion.message}</div>}
  </div>

  {/* Sueldo */}
  <div className="mb-2">
    <input
      type="text"
      className={`form-control ${errors.sueldo ? 'is-invalid' : ''}`}
      placeholder="Sueldo (opcional)"
      {...register('sueldo')}
    />
    {errors.sueldo && <div className="invalid-feedback">{errors.sueldo.message}</div>}
  </div>

  {/* Modalidad */}
  <div className="mb-2">
    <input
      type="text"
      className={`form-control ${errors.modalidad ? 'is-invalid' : ''}`}
      placeholder="Modalidad (opcional)"
      {...register('modalidad')}
    />
    {errors.modalidad && <div className="invalid-feedback">{errors.modalidad.message}</div>}
  </div>

  {/* Horario */}
  <div className="mb-2">
    <input
      type="text"
      className={`form-control ${errors.horario ? 'is-invalid' : ''}`}
      placeholder="Horario *"
      {...register('horario')}
    />
    {errors.horario && <div className="invalid-feedback">{errors.horario.message}</div>}
  </div>

  {/* Contacto */}
  <div className="mb-2">
    <input
      type="text"
      className={`form-control ${errors.contacto ? 'is-invalid' : ''}`}
      placeholder="Contacto *"
      {...register('contacto')}
    />
    {errors.contacto && <div className="invalid-feedback">{errors.contacto.message}</div>}
  </div>

  {/* Logo */}
  <div className="mb-2">
    <input
      type="text"
      className={`form-control ${errors.logo ? 'is-invalid' : ''}`}
      placeholder="Logo URL (opcional)"
      {...register('logo')}
    />
    {errors.logo && <div className="invalid-feedback">{errors.logo.message}</div>}
  </div>

  <small className="text-muted d-block mb-3">* Campos obligatorios</small>
  <div className="d-flex gap-2">
    <button
      type="submit"
      className="btn btn-bordo flex-grow-1"
      disabled={isSubmitting}
    >
      <i className={`bi ${modoEdicion ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>
      {modoEdicion ? 'Guardar Cambios' : 'Agregar Oferta'}
    </button>
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => {
        setMostrarFormulario(false);
        limpiarFormulario();
        reset();
      }}
    >
      Cancelar
    </button>
  </div>
</form>
            </div>
          )}
        </>
      )}

       <Accordion defaultActiveKey={(s ? s.toString() : '0')}>
        {itemsFiltrados.map((item) => (
          <Accordion.Item 
          eventKey={item.id.toString()}
          key={item.id}
          id={`oferta-${item.id}`} // Agregar ID para scroll
          >
          <Accordion.Header>
            <div className="d-flex align-items-center justify-content-between w-100">
              <span className="fw-semibold">{item.titulo}</span>
              {usuarioLogueado?.rolPostulante === true && (
               <span
                 className={`badge ${postulaciones[item.id] ? 'bg-success' : 'bg-secondary'} text-light ms-2`}
                 style={{ fontSize: '0.75rem' }}
               >
                 {postulaciones[String(item.id)] ? 'Ya te postulaste' : 'Aún no se ha postulado'}
               </span>
             )}
            </div>
          </Accordion.Header>

          <Accordion.Body>
            {item.logo && (
              <img
                src={item.logo}
                alt="Logo empresa"
                style={{ maxHeight: '60px' }}
                className="mb-3"
              />
            )}
            <p><strong>Categoría:</strong> {item.categoria || 'No especificada'}</p>
            <p><strong>Ubicación:</strong> {item.ubicacion || 'No especificada'}</p>
            <p><strong>Sueldo:</strong> {item.sueldo || 'A convenir'}</p>
            <p><strong>Modalidad:</strong> {item.modalidad || 'No especificada'}</p>
            <p><strong>Horario:</strong> {item.horario || 'No especificado'}</p>
            <p><strong>Contacto:</strong> {item.contacto || 'No especificado'}</p>
            <p className="mt-2">{item.descripcion}</p>

            <div className="d-flex gap-2 mt-3">
              {usuarioLogueado?.rolPostulante === false ? (
                <>
                  <button
                    className="btn btn-sm btn-bordo-danger"
                    onClick={() => iniciarEdicion(item)}
                  >
                    <i className="bi bi-pencil-square me-1"></i> Editar
                  </button>
                  <button
                    className="btn btn-sm btn-bordo-danger"
                    onClick={() => confirmarEliminar(item.id)}
                  >
                    <i className="bi bi-trash3-fill me-1"></i> Eliminar
                  </button>
                  <button
                    className="btn btn-sm btn-bordo-danger"
                    onClick={() => verPostulados(item.id)}
                  >
                  <i className="bi bi-eye"></i> Ver Postulados
                  </button>
            </>
          ) : (
            <Button variant="dark" onClick={() => handlePostular(item)}>
              Postularse <IoIosPaper />
            </Button>
          )}
        </div>
      </Accordion.Body>
      </Accordion.Item>
        ))}
      </Accordion>

      {/* Modal de confirmación de eliminación */}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Confirmar eliminación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">¿Estás seguro que querés eliminar esta oferta? Esta acción no se puede deshacer.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={eliminarConfirmado}>
            <i className="bi bi-trash3-fill me-1"></i>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de postulación */}
      <FormularioPostulacionModal
        show={modalVisible}
        handleClose={() => setModalVisible(false)}
        empresa={empresaSeleccionada}
      />

      {/* Modal de notificaciones */}
      <NotificacionModal
        show={notificacion.show}
        handleClose={() => setNotificacion({ ...notificacion, show: false })}
        titulo={notificacion.titulo}
        mensaje={notificacion.mensaje}
        tipo={notificacion.tipo}
      />

      {/* Modal para ver los postulados */}
      <PostuladosModal
        show={mostrarPostulados}
        handleClose={() => setMostrarModalPostulados(false)}
        ofertaId={idOfertaSeleccionada}
      />

    </div>
  );
}

export default Acordion;