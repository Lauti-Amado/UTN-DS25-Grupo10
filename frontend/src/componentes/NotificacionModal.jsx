//ESTE COMPONENTE ESTA USADO PARA EL ACORDEON
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function NotificacionModal({ show, handleClose, titulo, mensaje, tipo = 'success' }) {
  const iconos = {
    success: 'bi-check-circle-fill text-success',
    error: 'bi-exclamation-circle-fill text-danger',
    warning: 'bi-exclamation-triangle-fill text-warning',
    info: 'bi-info-circle-fill text-info'
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="d-flex align-items-center gap-2">
          <i className={`bi ${iconos[tipo]} fs-4`}></i>
          {titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{mensaje}</p>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NotificacionModal;