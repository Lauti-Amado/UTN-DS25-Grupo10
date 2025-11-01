import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, ListGroup, Spinner } from 'react-bootstrap';
import ModalPerfil from './ModalPerfil';
import { API_URL } from '../config';
import NotificacionContratación from './NotificacionContratación';

function PostuladosModal({ show, handleClose, ofertaId, postulanteDestacadoId }) {
  const [formularios, setFormularios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [postuladoSeleccionado, setPostuladoSeleccionado] = useState(null);
  const [mensajeContratacion, setMensajeContratacion] = useState('');
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  
  const postulanteRefs = useRef({});

  const abrirPerfil = (postuladoId) => {
    console.log("Abriendo perfil del usuario postulante");
    setPostuladoSeleccionado(postuladoId);
    setMostrarModal(true);
  };
  
  const cerrarModal = () => {
    console.log("Cerrando modal");
    setMostrarModal(false);
    setPostuladoSeleccionado(null);
  };

  useEffect(() => {
    if (!ofertaId || !show) return;

    setCargando(true);

    fetch(`${API_URL}/ofertas/${ofertaId}/formularios`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFormularios(data.data);
        } else {
          console.error('Error en la respuesta del servidor:', data);
        }
      })
      .catch((err) => {
        console.error('Error al obtener formularios:', err);
      })
      .finally(() => setCargando(false));
  }, [ofertaId, show]);

  // Scroll automático al postulante destacado
  useEffect(() => {
    if (postulanteDestacadoId && formularios.length > 0 && show) {
      setTimeout(() => {
        const elemento = postulanteRefs.current[postulanteDestacadoId];
        if (elemento) {
          elemento.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 300);
    }
  }, [postulanteDestacadoId, formularios, show]);

  const manejarContratacion = async (usuarioId, ofertaId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/formularios/${usuarioId}/${ofertaId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setPostuladoSeleccionado(usuarioId);
      setMensajeContratacion(result.data);
      setMostrarNotificacion(true);
    } catch (error) {
      console.error(error);
      setMensajeContratacion('Ocurrió un error al contratar al postulante.');
      setMostrarNotificacion(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Lista de Postulados</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {cargando ? (
            <div className="text-center">
              <Spinner animation="border" role="status" />
            </div>
          ) : formularios.length === 0 ? (
            <p className="text-muted text-center">No hay postulaciones registradas.</p>
          ) : (
            <ListGroup variant="flush">
              {formularios.map((form, index) => {
                // Verificar si es el postulante destacado
                const esDestacado = form.postuladoId === postulanteDestacadoId;
                
                return (
                  <ListGroup.Item 
                    key={index} 
                    className="mb-3"
                    ref={el => postulanteRefs.current[form.postuladoId] = el}
                    style={{
                      border: esDestacado ? '3px solid #dc3545' : '1px solid #dee2e6',
                      backgroundColor: esDestacado ? '#fff3cd' : 'transparent',
                      transition: 'all 0.3s ease',
                      borderRadius: '8px'
                    }}
                  >
                    {esDestacado && (
                      <div className="badge bg-danger mb-2">
                        <i className="bi bi-star-fill me-1"></i>
                        Postulante Seleccionado
                      </div>
                    )}
                    
                    <div className="d-flex flex-column flex-md-row gap-3 align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">
                          <strong>Nombre y Apellido:</strong> {form.nombre} {form.apellido}
                        </h6>
                        <p className="mb-1">
                          <strong>Localidad:</strong> {form.localidad || 'No especificada'}
                        </p>
                        <p className="mb-1">
                          <strong>Descripción:</strong> {form.descripcion || 'Sin descripción'}
                        </p>
                        <p className="mb-1">
                          <strong>Descargar Curriculum:</strong>
                          <a
                            href={`${API_URL}/uploads/${form.curriculum}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-danger btn-sm ms-2"
                          >
                            <i className="bi bi-arrow-down-circle-fill"></i>
                          </a>
                        </p>
                      </div>
                      
                      <div className="d-flex flex-column gap-2">
                        <button 
                          onClick={() => abrirPerfil(form.postuladoId)} 
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="bi bi-person-fill me-1"></i>
                          Ver Perfil
                        </button>
                        
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => manejarContratacion(form.postuladoId, form.ofertaId)}
                        >
                          <i className="bi bi-check-circle-fill me-1"></i>
                          Contratar
                        </Button>
                      </div>
                    </div>
                    
                    {mostrarModal && postuladoSeleccionado === form.postuladoId && (
                      <ModalPerfil
                        usuarioId={postuladoSeleccionado}
                        onCerrar={cerrarModal}
                      />
                    )}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de notificación de contratación */}
      {mostrarNotificacion && (
        <NotificacionContratación
          data={mensajeContratacion}
          usuarioId={postuladoSeleccionado}
        />
      )}
    </>
  );
}

export default PostuladosModal;