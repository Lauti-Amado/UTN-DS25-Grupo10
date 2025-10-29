import React, { useEffect, useState } from 'react';
import { Modal, Button, ListGroup, Spinner, Image } from 'react-bootstrap';
import { DatosContexto } from '../datosContext';
import ModalPerfil from './ModalPerfil';
import { API_URL } from '../config';
import NotificacionContratación from './NotificacionContratación';

function PostuladosModal({ show, handleClose, ofertaId }) {
  const [formularios, setFormularios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [postuladoSeleccionado, setPostuladoSeleccionado] = useState(null);
  const [mensajeContratacion, setMensajeContratacion] = useState('');
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);


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

  const manejarContratacion = async (usuarioId, ofertaId) => {
    try {
         const token =localStorage.getItem('token');
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
      <Modal.Body>
        {cargando ? (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        ) : formularios.length === 0 ? (
          <p className="text-muted text-center">No hay postulaciones registradas.</p>
        ) : (
          <ListGroup variant="flush">
            {formularios.map((form, index) => (
              <ListGroup.Item key={index} className="mb-3">
                <div className="d-flex flex-column flex-md-row gap-3 align-items-start">
 
                  <div className="flex-grow-1">
                    <h6 className="mb-1"> <strong> Nombre y Apellido:</strong> {form.nombre} {form.apellido}</h6>
                    <p className="mb-1"><strong>Localidad:</strong> {form.localidad || 'No especificada'}</p>
                    <p className="mb-1"><strong>Descripción:</strong> {form.descripcion || 'Sin descripción'}</p>
                    <p className="mb-1"> <strong> Descargar Curriculum: </strong>
                      {/* Boton par descargar CV */}
                       <a
                         href={`${API_URL}/uploads/${form.curriculum}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="btn btn-outline-danger"
                       >
                           <i className="bi bi-arrow-down-circle-fill"></i>
                       </a>
                    </p>
                  </div>
                  <button onClick={() => abrirPerfil(form.postuladoId)} className="bi bi-person-fill"> Ver Perfil </button>
                  {mostrarModal && postuladoSeleccionado === form.postuladoId && (
                    <ModalPerfil
                      usuarioId={postuladoSeleccionado}
                     onCerrar={cerrarModal}
                   />
                  )}

                  {/* Botón para contratar*/}
                  <div>
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => manejarContratacion(form.postuladoId, form.ofertaId)}
                    >
                      Contratar
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
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