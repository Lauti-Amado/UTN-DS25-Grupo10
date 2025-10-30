import React, { useState, useEffect, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useLocation } from 'react-router-dom';
import './acordion.css';
import { DatosContexto } from '../datosContext.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal } from 'react-bootstrap';
import { IoIosPaper } from "react-icons/io";
import { HiCursorArrowRays } from "react-icons/hi2";
import FormularioPostulacionModal from './FormularioPostulacionModal';
import PostuladosModal from './PostuladosModal';
import NotificacionModal from './NotificacionModal';
import { ofertaSchema } from '../validations/oferta.js'; 
import { API_URL } from '../config.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import VerResultadoContratacion from './VerResultadoContratacion.jsx';

function Acordion() {
  const location = useLocation();
  const s = location.state?.mensaje;
  const { busquedaGlobal, usuarioLogueado } = useContext(DatosContexto);
  const [mostrarModalCancelar, setMostrarModalCancelar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [items, setItems] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarPostulados, setMostrarModalPostulados] = useState(false);
  const [idOfertaSeleccionada, setIdOfertaSeleccionada] = useState(null);
  const [dataResultado, setDataResultado] = useState(null);

  // Estado para trackear postulaciones del usuario
  const [postulaciones, setPostulaciones] = useState({}); // Objeto { [ofertaId]: true/false }

  // Estados para edición
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ofertaEditando, setOfertaEditando] = useState(null);

  // Estados para notificaciones
  const [notificacion, setNotificacion] = useState({ show: false, titulo: '', mensaje: '', tipo: 'success' });

  // Filtro por búsqueda global
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
  };

  // Muestra una notificación modal
  const mostrarNotificacion = (titulo, mensaje, tipo = 'success') => {
    setNotificacion({ show: true, titulo, mensaje, tipo });
  };

  // Cargar ofertas desde la base de datos
  useEffect(() => {
    if (!usuarioLogueado) return;

    const checkPostulacion = async (usuarioId, ofertaId) => {
      try {
        const res = await fetch(`${API_URL}/formularios/${usuarioId}/${ofertaId}`);
        if (!res.ok) {
          console.warn(`checkPostulacion fallo para oferta ${ofertaId} con status ${res.status}`);
          return false;
        }
        const data = await res.json();
        return data.existe ?? false;
      } catch (err) {
        console.error(`Error en checkPostulacion oferta ${ofertaId}:`, err);
        return false;
      }
    };

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

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    const ofertaData = {
      ...data,
      creadorId: usuarioLogueado.id,
      sueldo: data.sueldo || undefined,
      modalidad: data.modalidad || undefined,
      logo: data.logo || undefined,
    };

    try {
      let response;
      if (modoEdicion && ofertaEditando) {
        response = await fetch(`${API_URL}/ofertas/${ofertaEditando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ofertaData),
        });
      } else {
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

      setMostrarFormulario(false);
      limpiarFormulario();
      reset();
    } catch (err) {
      console.error(err);
      mostrarNotificacion('Error', err.message || 'No se pudo completar la operación', 'error');
    }
  };

  const confirmarEliminar = (id) => {
    setIdAEliminar(id);
    setMostrarModal(true);
  };

  const verResultado = async (ofertaId) => {
    try {
      const response = await fetch(`${API_URL}/formularios/respuesta/${usuarioLogueado.id}/${ofertaId}}`);
      const res = await response.json();
      setDataResultado(res.data);
    } catch (error) {
      console.error('Error al obtener resultado:', error);
    }
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
  };

  const cancelarFormulario = () => {
    limpiarFormulario();
    setMostrarFormulario(false);
    reset();
  };

  const handlePostular = async (item) => {
    setEmpresaSeleccionada(item);
    setModalVisible(true);

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

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
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

  // Cargar datos al editar
  useEffect(() => {
    if (modoEdicion && ofertaEditando) {
      reset({
        titulo: ofertaEditando.titulo || '',
        descripcion: ofertaEditando.descripcion || '',
        categoria: ofertaEditando.categoria || '',
        ubicacion: ofertaEditando.ubicacion || '',
        sueldo: ofertaEditando.sueldo || '',
        modalidad: ofertaEditando.modalidad || '',
        horario: ofertaEditando.horario || '',
        contacto: ofertaEditando.contacto || '',
        logo: ofertaEditando.logo || '',
      });
    }
  }, [modoEdicion, ofertaEditando, reset]);

  return (
    <div className="container mt-4">
      {usuarioLogueado?.rolPostulante === false && (
        <>
          <button
            className="btn-toggle-formulario mb-3"
            onClick={() => {
              if (mostrarFormulario) {
                setMostrarModalCancelar(true);
              } else {
                setMostrarFormulario(true);
              }
            }}
          >
            <i className={`bi ${mostrarFormulario ? 'bi-dash-circle' : 'bi-plus-circle'}`}></i>
            {modoEdicion ? ' Editar Oferta' : ' Nueva Oferta'}
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
                    placeholder="Categoría (ej: IT, Ventas, Marketing) *"
                    {...register('categoria')}
                  />
                  {errors.categoria && <div className="invalid-feedback">{errors.categoria.message}</div>}
                </div>

                {/* Ubicación */}
                <div className="mb-2">
                  <input
                    type="text"
                    className={`form-control ${errors.ubicacion ? 'is-invalid' : ''}`}
                    placeholder="Ubicación (ej: Buenos Aires, CABA, Argentina) *"
                    {...register('ubicacion')}
                  />
                  {errors.ubicacion && <div className="invalid-feedback">{errors.ubicacion.message}</div>}
                </div>

                {/* Sueldo */}
                <div className="mb-2">
                  <input
                    type="text"
                    className={`form-control ${errors.sueldo ? 'is-invalid' : ''}`}
                    placeholder="Sueldo (ej: 150000, A convenir) *"
                    {...register('sueldo')}
                  />
                  {errors.sueldo && <div className="invalid-feedback">{errors.sueldo.message}</div>}
                </div>

                {/* Modalidad */}
                <div className="mb-2">
                  <select
                    className={`form-select ${errors.modalidad ? 'is-invalid' : ''}`}
                    {...register('modalidad')}
                  >
                    <option value="">Seleccionar modalidad (opcional)</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrida">Híbrida</option>
                    <option value="Remota">Remota</option>
                  </select>
                  {errors.modalidad && <div className="invalid-feedback">{errors.modalidad.message}</div>}
                </div>

                {/* Horario */}
                <div className="mb-3">
                  <div 
                    className={`border rounded p-3 ${errors.horario ? 'border-danger' : 'border-secondary'}`}
                    style={{ backgroundColor: '#f8f9fa' }}
                  >
                    <label className="form-label fw-semibold mb-2">
                      <i className="bi bi-alarm me-2"></i>
                      Horario *
                    </label>
                    <div className="d-flex gap-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="partTime"
                          value="Part-time"
                          {...register('horario')}
                        />
                        <label className="form-check-label" htmlFor="partTime">
                          <i className="bi bi-clock me-1"></i>
                          Part-time
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="fullTime"
                          value="Full-time"
                          {...register('horario')}
                        />
                        <label className="form-check-label" htmlFor="fullTime">
                          <i className="bi bi-clock-fill me-1"></i>
                          Full-time
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.horario && <div className="text-danger small mt-1">{errors.horario.message}</div>}
                </div>

                {/* Contacto */}
                <div className="mb-2">
                  <input
                    type="text"
                    className={`form-control ${errors.contacto ? 'is-invalid' : ''}`}
                    placeholder="Contacto (email, teléfono o link) *"
                    {...register('contacto')}
                  />
                  {errors.contacto && <div className="invalid-feedback">{errors.contacto.message}</div>}
                  <small className="form-text text-muted">
                    Ejemplos: email@empresa.com, +54 11 1234-5678, https://wa.me/5491112345678
                  </small>
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
                
                {/* Solo botón de submit - SIN botón cancelar */}
                <button
                  type="submit"
                  className="btn btn-bordo w-100"
                  disabled={isSubmitting}
                >
                  <i className={`bi ${modoEdicion ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>
                  {modoEdicion ? 'Guardar Cambios' : 'Agregar Oferta'}
                </button>
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
            id={`oferta-${item.id}`}
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
/
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

      {/* Modal de cancelación del formulario */}
      <Modal 
        show={mostrarModalCancelar} 
        onHide={() => setMostrarModalCancelar(false)} 
        centered
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Confirmar cancelación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">¿Estás seguro que querés cancelar? Los cambios se perderán.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalCancelar(false)}>
            Volver
          </Button>
          <Button variant="danger" onClick={() => {
            cancelarFormulario();
            setMostrarModalCancelar(false);
          }}>
            Sí, descartar cambios
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

      {dataResultado && (
      <VerResultadoContratacion data={dataResultado} />
    )}


    </div>
  );
}

export default Acordion;