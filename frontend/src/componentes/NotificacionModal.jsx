import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function NotificacionModal({ show, handleClose, titulo, mensaje, tipo = 'success' }) {
  const iconos = {
    success: 'bi-check-circle-fill text-success',
    error: 'bi-exclamation-circle-fill text-danger',
    warning: 'bi-exclamation-triangle-fill text-warning',
    info: 'bi-info-circle-fill text-info'
  };

  const variantes = {
    success: 'success',
    error: 'danger',
    warning: 'warning',
    info: 'primary'
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      backdrop="static"
      contentClassName="shadow-lg"
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center gap-2 w-100">
          <i className={`bi ${iconos[tipo]} fs-4`}></i>
          <span className="flex-grow-1">{titulo}</span>
          <button 
            type="button" 
            className="btn-close" 
            aria-label="Close"
            onClick={handleClose}
            style={{ 
              fontSize: '0.75rem',
              opacity: 0.8
            }}
          />
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="py-4">
        <p className="mb-0">{mensaje}</p>
      </Modal.Body>
      
      <Modal.Footer className="border-0" style={{ justifyContent: 'center' }}>
        <Button 
          variant={variantes[tipo]} 
          onClick={handleClose}
          className="px-4"
        >
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NotificacionModal;