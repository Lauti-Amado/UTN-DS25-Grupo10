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
import NotificacionModal from './NotificacionModal';

function Acordion() {
  const location = useLocation();
  const s = location.state?.mensaje;
  const { busquedaGlobal, usuarioLogueado } = useContext(DatosContexto);

  const [modalVisible, setModalVisible] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
<<<<<<< HEAD

  const cargarDesdeLocalStorage = () => { //funcion para guardar empleos en forma local
=======
  const [items, setItems] = useState(() => {
>>>>>>> ccfdf64d2385e2d0682bd23ff42ca3a701bbef7d
    const datosGuardados = localStorage.getItem('empleos');
    if (datosGuardados) return JSON.parse(datosGuardados);
    localStorage.setItem('empleos', JSON.stringify(datosEmpleosIniciales));
    return datosEmpleosIniciales;
  });

  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [sueldo, setSueldo] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [horario, setHorario] = useState('');
  const [contacto, setContacto] = useState('');
  const [logo, setLogo] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estados para edición
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ofertaEditando, setOfertaEditando] = useState(null);

  // Estados para notificaciones
  const [notificacion, setNotificacion] = useState({ show: false, titulo: '', mensaje: '', tipo: 'success' });

  useEffect(() => {
    localStorage.setItem('empleos', JSON.stringify(items));
  }, [items]);

  const itemsFiltrados = items.filter(
    (item) =>
      item.titulo.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(busquedaGlobal.toLowerCase())
  );

<<<<<<< HEAD
  //boton para cargar el formulario de la oferta , se usan la coneccion con la base de datos supabase
  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (nuevoTitulo.trim() && nuevoContenido.trim()) {
      const nuevo = {
        id: Date.now(),
        titulo: nuevoTitulo,
        contenido: nuevoContenido,
        categoria: nuevaCategoria,
        ubicacion,
        sueldo,
        modalidad,
        horario,
        contacto,
        logo
      };

      //inserto en supabase
      try{
        const response = await fetch('http://localhost:3000/ofertas',
        {
          method: "POST",
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(nuevo), credentials: "include"
        });

        if (!response.ok) {
          throw new Error("Error al insertar en Supabase");
        }

        const data = await response.json();
        //actualizar estado 
        const actualizados = [...items, data[0]];
        
        setItems(actualizados);

        //limpia formulario
        setNuevoTitulo('');
        setNuevoContenido('');
        setNuevaCategoria('');
        setUbicacion('');
        setSueldo('');
        setModalidad('');
        setHorario('');
        setContacto('');
        setLogo('');
        setMostrarFormulario(false);

      } catch (error) {
        console.error("Error al insertar en Supabase:", error);
      
      }
 
=======
  const limpiarFormulario = () => {
    setNuevoTitulo('');
    setNuevaDescripcion('');
    setNuevaCategoria('');
    setUbicacion('');
    setSueldo('');
    setModalidad('');
    setHorario('');
    setContacto('');
    setLogo('');
    setModoEdicion(false);
    setOfertaEditando(null);
  };

  const mostrarNotificacion = (titulo, mensaje, tipo = 'success') => {
    setNotificacion({ show: true, titulo, mensaje, tipo });
  };

  const validarFormulario = () => {
    if (!nuevoTitulo.trim()) {
      mostrarNotificacion('Campo requerido', 'Por favor ingresa un título para la oferta', 'warning');
      return false;
    }
    if (!nuevaDescripcion.trim()) {
      mostrarNotificacion('Campo requerido', 'Por favor ingresa una descripción', 'warning');
      return false;
    }
    if (!nuevaCategoria.trim()) {
      mostrarNotificacion('Campo requerido', 'Por favor ingresa una categoría', 'warning');
      return false;
    }
    if (!ubicacion.trim()) {
      mostrarNotificacion('Campo requerido', 'Por favor ingresa una ubicación', 'warning');
      return false;
    }
    if (!horario.trim()) {
      mostrarNotificacion('Campo requerido', 'Por favor ingresa el horario', 'warning');
      return false;
    }
    if (!contacto.trim()) {
      mostrarNotificacion('Campo requerido', 'Por favor ingresa un medio de contacto', 'warning');
      return false;
    }
    return true;
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    const ofertaData = {
      titulo: nuevoTitulo,
      descripcion: nuevaDescripcion,
      categoria: nuevaCategoria,
      ubicacion: ubicacion,
      sueldo: sueldo || undefined,
      modalidad: modalidad || undefined,
      horario: horario,
      contacto: contacto,
      logo: logo || undefined,
      creadorId: usuarioLogueado.id,
    };

    if (modoEdicion && ofertaEditando) {
      // EDITAR OFERTA
      fetch(`http://localhost:3000/ofertas/${ofertaEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ofertaData),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(err => {
              console.error("Error del servidor:", err);
              throw new Error(err.message || "Error al actualizar la oferta");
            });
          }
          return res.json();
        })
        .then((data) => {
          setItems((prev) => prev.map(item => 
            item.id === ofertaEditando.id ? data.data : item
          ));
          limpiarFormulario();
          setMostrarFormulario(false);
          mostrarNotificacion('Actualizado', 'La oferta se actualizó correctamente', 'success');
        })
        .catch((err) => {
          console.error("Error:", err);
          mostrarNotificacion('Error', `No se pudo actualizar: ${err.message}`, 'error');
        });
    } else {
      // CREAR OFERTA NUEVA
      fetch('http://localhost:3000/ofertas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ofertaData),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(err => {
              console.error("Error del servidor:", err);
              throw new Error(err.message || "Error al guardar la oferta");
            });
          }
          return res.json();
        })
        .then((data) => {
          const nueva = {
            id: data.data.id,
            titulo: data.data.titulo,
            descripcion: data.data.descripcion,
            contacto: data.data.contacto,
            logo: data.data.logo,
            categoria: data.data.categoria,
            ubicacion: data.data.ubicacion,
            sueldo: data.data.sueldo,
            modalidad: data.data.modalidad,
            horario: data.data.horario,
          };
          setItems((prev) => [...prev, nueva]);
          limpiarFormulario();
          setMostrarFormulario(false);
          mostrarNotificacion('Éxito', 'La oferta se creó correctamente', 'success');
        })
        .catch((err) => {
          console.error("Error:", err);
          mostrarNotificacion('Error', `No se pudo crear la oferta: ${err.message}`, 'error');
        });
>>>>>>> ccfdf64d2385e2d0682bd23ff42ca3a701bbef7d
    }
  };

  const confirmarEliminar = (id) => {
    setIdAEliminar(id);
    setMostrarModal(true);
  };

<<<<<<< HEAD
  //esta linea fue modificada por juan para que elimine de la base de datos una oferta
  const eliminarConfirmado = async () => {
    try{
      const response = await fetch(`http://localhost:3000/ofertas/${idAEliminar}`,
      { method: "DELETE"});
      if (!response.ok) {
        throw new Error("Error al eliminar en la base de datos");
      }

      const nuevas = items.filter((item) => item.id !== idAEliminar);
      setItems(nuevas);
      setMostrarModal(false);

    } catch (error) {
      console.error("Error al eliminar en la base de datos:", error);
    }
  };

  const handlePostular = (empresa) => {
    setEmpresaSeleccionada(empresa);
=======
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
    setNuevoTitulo(item.titulo);
    setNuevaDescripcion(item.descripcion);
    setNuevaCategoria(item.categoria);
    setUbicacion(item.ubicacion);
    setSueldo(item.sueldo || '');
    setModalidad(item.modalidad || '');
    setHorario(item.horario);
    setContacto(item.contacto);
    setLogo(item.logo || '');
    setMostrarFormulario(true);
  };

  const cancelarFormulario = () => {
    limpiarFormulario();
    setMostrarFormulario(false);
  };

  const handlePostular = (item) => {
    setEmpresaSeleccionada(item);
>>>>>>> ccfdf64d2385e2d0682bd23ff42ca3a701bbef7d
    setModalVisible(true);
  };

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
              <form onSubmit={manejarSubmit} className="mb-4">
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  placeholder="Título del empleo *"
                  value={nuevoTitulo} 
                  onChange={(e) => setNuevoTitulo(e.target.value)} 
                />
                <textarea 
                  className="form-control mb-2" 
                  placeholder="Descripción del empleo *"
                  value={nuevaDescripcion} 
                  onChange={(e) => setNuevaDescripcion(e.target.value)} 
                  rows="3"
                />
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  placeholder="Categoría *"
                  value={nuevaCategoria} 
                  onChange={(e) => setNuevaCategoria(e.target.value)} 
                />
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  placeholder="Ubicación *"
                  value={ubicacion} 
                  onChange={(e) => setUbicacion(e.target.value)} 
                />
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  placeholder="Sueldo (opcional)"
                  value={sueldo} 
                  onChange={(e) => setSueldo(e.target.value)} 
                />
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  placeholder="Modalidad (opcional)"
                  value={modalidad} 
                  onChange={(e) => setModalidad(e.target.value)} 
                />
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  placeholder="Horario *"
                  value={horario} 
                  onChange={(e) => setHorario(e.target.value)} 
                />
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  placeholder="Contacto *"
                  value={contacto} 
                  onChange={(e) => setContacto(e.target.value)} 
                />
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  placeholder="Logo URL (opcional)"
                  value={logo} 
                  onChange={(e) => setLogo(e.target.value)} 
                />
                <small className="text-muted d-block mb-3">* Campos obligatorios</small>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-bordo flex-grow-1">
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

      <Accordion defaultActiveKey={(s ?? 0).toString()}>
        {itemsFiltrados.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={item.id}>
            <Accordion.Header>{item.titulo}</Accordion.Header>
            <Accordion.Body>
              {item.logo && <img src={item.logo} alt="Logo empresa" style={{ maxHeight: '60px' }} className="mb-3" />}
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
    </div>
  );
}

export default Acordion;