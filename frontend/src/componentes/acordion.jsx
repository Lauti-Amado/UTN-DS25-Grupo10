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

// 🔹 Nuevos imports para react-hook-form
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

  // 🔸 Estados que ya NO necesitamos (se reemplazan por react-hook-form)
  // const [nuevoTitulo, setNuevoTitulo] = useState('');
  // ... (todos los useState del formulario)

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

  // 🔹 Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ofertaSchema),
    mode: 'onChange', // ✅ validación en tiempo real
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
    }
  });

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
    reset({
      titulo: '',
      descripcion: '',
      categoria: '',
      ubicacion: '',
      sueldo: '',
      modalidad: '',
      horario: '',
      contacto: '',
      logo: ''
    });
    setModoEdicion(false);
    setOfertaEditando(null);
  };

  // 🟢 Cargar ofertas desde backend (sin cambios)
  useEffect(() => {
    if (!usuarioLogueado) return;

    const fetchOfertas = async () => {
      try {
        let API_URL;
        if (usuarioLogueado.rolPostulante) {
          API_URL = `http://localhost:3000/ofertas`;
        } else {
          API_URL = `http://localhost:3000/ofertas/empleador/${usuarioLogueado.id}`;
        }

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al obtener las ofertas");
        const data = await res.json();

        if (Array.isArray(data)) {
          setItems(data);
        } else if (data.success && Array.isArray(data.data)) {
          setItems(data.data);
        } else {
          console.warn("Formato de datos inesperado:", data);
          setItems([]);
        }
      } catch (err) {
        console.error("Error al cargar las ofertas:", err);
        setNotificacion({
          show: true,
          titulo: 'Error',
          mensaje: 'No se pudieron cargar las ofertas.',
          tipo: 'error'
        });
      }
    };

  // Muestra una notificación modal
  const mostrarNotificacion = (titulo, mensaje, tipo = 'success') => {
    setNotificacion({ show: true, titulo, mensaje, tipo });
  };

  //traigo las ofertas del backend 
  // 🟢 Cargar ofertas desde la base de datos del usuario logueado
  useEffect(() => {
  if (!usuarioLogueado) return;

  // 🔹 Función para chequear si el usuario ya se postuló a una oferta
  const checkPostulacion = async (usuarioId, ofertaId) => {
    try {
      const res = await fetch(`http://localhost:3000/formularios/${usuarioId}/${ofertaId}`);
      if (!res.ok) {
        console.warn(`checkPostulacion fallo para oferta ${ofertaId} con status ${res.status}`);
        return false; // devolvemos false si falla
      }
      const data = await res.json();
      console.log(`checkPostulacion - ofertaId ${ofertaId}:`, data);
      return data.existe ?? false; // si por algún motivo no hay existe, devolvemos false
    } catch (err) {
      console.error(`Error en checkPostulacion oferta ${ofertaId}:`, err);
      return false;
    }
  };

  // 🔹 Función principal para traer ofertas y sus postulaciones
  const fetchOfertas = async () => {
    try {
      const API_URL = usuarioLogueado.rolPostulante
        ? `http://localhost:3000/ofertas`
        : `http://localhost:3000/ofertas/empleador/${usuarioLogueado.id}`;

      const res = await fetch(API_URL);
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
        // 🔹 Verificar postulaciones del usuario con manejo de errores individuales
        const resultados = await Promise.all(
          ofertasArray.map(async (item) => {
            try {
              const existe = await checkPostulacion(usuarioLogueado.id, item.id);
              return [item.id, existe];
            } catch (err) {
              console.error(`Error individual al checkear postulacion oferta ${item.id}:`, err);
              return [item.id, false]; // si falla, asumimos no postuló
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

  // Validación del formulario
 const validarFormularioYup = async () => {
  const ofertaData = {
    titulo: nuevoTitulo,
    descripcion: nuevaDescripcion,
    categoria: nuevaCategoria,
    ubicacion: ubicacion,
    sueldo: sueldo,
    modalidad: modalidad,
    horario: horario,
    contacto: contacto,
    logo: logo,
  };

  try {
    await ofertaSchema.validate(ofertaData, { abortEarly: false });
    return true; // todo ok
  } catch (err) {
    if (err.inner && err.inner.length > 0) {
      // Mostrar todas las notificaciones de errores
      err.inner.forEach(e => {
        mostrarNotificacion('Error de validación', e.message, 'warning');
      });
    } else {
      mostrarNotificacion('Error de validación', err.message, 'warning');
    }
    return false;
  }
};



  // Maneja el envío del formulario para crear o editar una oferta
  const manejarSubmit = async (e) => {
    e.preventDefault();
    
     const esValido = await validarFormularioYup();
     if (!esValido) return;
>>>>>>> main

    fetchOfertas();
  }, [usuarioLogueado]);

  // 🔹 Maneja el envío del formulario (ahora recibe `data` validado)
  const manejarSubmit = async (data) => {
    const ofertaData = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      categoria: data.categoria,
      ubicacion: data.ubicacion,
      sueldo: data.sueldo || undefined,
      modalidad: data.modalidad || undefined,
      horario: data.horario,
      contacto: data.contacto,
      logo: data.logo || undefined,
      creadorId: usuarioLogueado.id,
    };

    try {
      if (modoEdicion && ofertaEditando) {
        // EDITAR
        const res = await fetch(`http://localhost:3000/ofertas/${ofertaEditando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ofertaData),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Error al actualizar la oferta");
        }

        const updatedData = await res.json();
        setItems((prev) =>
          prev.map((item) => (item.id === ofertaEditando.id ? updatedData.data : item))
        );
        mostrarNotificacion('Éxito', 'La oferta se actualizó correctamente', 'success');
      } else {
        // CREAR
        const res = await fetch('http://localhost:3000/ofertas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ofertaData),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Error al crear la oferta");
        }

        const nuevaOferta = await res.json();
        setItems((prev) => [...prev, nuevaOferta.data]);
        mostrarNotificacion('Éxito', 'La oferta se creó correctamente', 'success');
      }

      limpiarFormulario();
      setMostrarFormulario(false);
    } catch (err) {
      console.error("Error:", err);
      mostrarNotificacion('Error', `No se pudo guardar la oferta: ${err.message}`, 'error');
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
    fetch(`http://localhost:3000/ofertas/${idAEliminar}`, { method: 'DELETE' })
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

    // 🔹 Carga los valores en el formulario de react-hook-form
    reset({
      titulo: item.titulo || '',
      descripcion: item.descripcion || '',
      categoria: item.categoria || '',
      ubicacion: item.ubicacion || '',
      sueldo: item.sueldo || '',
      modalidad: item.modalidad || '',
      horario: item.horario || '',
      contacto: item.contacto || '',
      logo: item.logo || ''
    });
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
      const res = await fetch(`http://localhost:3000/formularios/${usuarioLogueado.id}/${item.id}`);
      if (!res.ok) throw new Error('Error al verificar postulacion');
      const data = await res.json();
      setPostulaciones(prev => ({ ...prev, [item.id]: data.existe }));
    } catch (err) {
      console.error(err);
    }
  }
};

  const mostrarNotificacion = (titulo, mensaje, tipo) => {
    setNotificacion({ show: true, titulo, mensaje, tipo });
  };

  // ───────────────────────────────────────────────
  // ✅ Resto del JSX: solo cambia el formulario
  // ───────────────────────────────────────────────

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
            }}
          >
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

              {/* 🔹 Formulario con react-hook-form */}
              <form onSubmit={handleSubmit(manejarSubmit)} className="mb-4">
                <input
                  type="text"
                  className={`form-control mb-2 ${errors.titulo ? 'is-invalid' : ''}`}
                  placeholder="Título del empleo *"
                  {...register('titulo')}
                />
                {errors.titulo && <div className="invalid-feedback">{errors.titulo.message}</div>}

                <textarea
                  className={`form-control mb-2 ${errors.descripcion ? 'is-invalid' : ''}`}
                  placeholder="Descripción del empleo *"
                  rows="3"
                  {...register('descripcion')}
                />
                {errors.descripcion && <div className="invalid-feedback">{errors.descripcion.message}</div>}

                <input
                  type="text"
                  className={`form-control mb-2 ${errors.categoria ? 'is-invalid' : ''}`}
                  placeholder="Categoría *"
                  {...register('categoria')}
                />
                {errors.categoria && <div className="invalid-feedback">{errors.categoria.message}</div>}

                <input
                  type="text"
                  className={`form-control mb-2 ${errors.ubicacion ? 'is-invalid' : ''}`}
                  placeholder="Ubicación *"
                  {...register('ubicacion')}
                />
                {errors.ubicacion && <div className="invalid-feedback">{errors.ubicacion.message}</div>}

                <input
                  type="text"
                  className={`form-control mb-2 ${errors.sueldo && 'is-invalid'}`}
                  placeholder="Sueldo (opcional)"
                  {...register('sueldo')}
                />
                {errors.sueldo && <div className="invalid-feedback">{errors.sueldo.message}</div>}

                <input
                  type="text"
                  className={`form-control mb-2 ${errors.modalidad && 'is-invalid'}`}
                  placeholder="Modalidad (opcional)"
                  {...register('modalidad')}
                />
                {errors.modalidad && <div className="invalid-feedback">{errors.modalidad.message}</div>}

                <input
                  type="text"
                  className={`form-control mb-2 ${errors.horario ? 'is-invalid' : ''}`}
                  placeholder="Horario *"
                  {...register('horario')}
                />
                {errors.horario && <div className="invalid-feedback">{errors.horario.message}</div>}

                <input
                  type="text"
                  className={`form-control mb-2 ${errors.contacto ? 'is-invalid' : ''}`}
                  placeholder="Contacto *"
                  {...register('contacto')}
                />
                {errors.contacto && <div className="invalid-feedback">{errors.contacto.message}</div>}

                <input
                  type="text"
                  className={`form-control mb-2 ${errors.logo && 'is-invalid'}`}
                  placeholder="Logo URL (opcional)"
                  {...register('logo')}
                />
                {errors.logo && <div className="invalid-feedback">{errors.logo.message}</div>}

                <small className="text-muted d-block mb-3">* Campos obligatorios</small>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-bordo flex-grow-1" disabled={Object.keys(errors).length > 0}>
                    <i className={`bi ${modoEdicion ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>
                    {modoEdicion ? 'Guardar Cambios' : 'Agregar Oferta'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelarFormulario}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* 🔹 Resto del JSX (Accordion, modales, etc.) SIN CAMBIOS */}
      <Accordion defaultActiveKey={(s ?? 0).toString()}>
        {itemsFiltrados.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={item.id}>
<<<<<<< JulianFigueira
            <Accordion.Header>{item.titulo}</Accordion.Header>
            <Accordion.Body>
              {item.logo && (
                <img src={item.logo} alt="Logo empresa" style={{ maxHeight: '60px' }} className="mb-3" />
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
=======
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
>>>>>>> main
        ))}
      </Accordion>

      {/* Modales (sin cambios) */}
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

      <FormularioPostulacionModal
        show={modalVisible}
        handleClose={() => setModalVisible(false)}
        empresa={empresaSeleccionada}
      />

      <NotificacionModal
        show={notificacion.show}
        handleClose={() => setNotificacion({ ...notificacion, show: false })}
        titulo={notificacion.titulo}
        mensaje={notificacion.mensaje}
        tipo={notificacion.tipo}
      />

      <PostuladosModal
        show={mostrarPostulados}
        handleClose={() => setMostrarModalPostulados(false)}
        ofertaId={idOfertaSeleccionada}
      />
    </div>
  );
}

export default Acordion;