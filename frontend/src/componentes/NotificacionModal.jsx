import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
      <Modal.Header className="border-0 pb-0 position-relative bg-white">
        <Modal.Title className="d-flex align-items-center gap-2">
          <i className={`bi ${iconos[tipo]} fs-4`}></i>
          <span>{titulo}</span>
        </Modal.Title>
        <button 
          type="button" 
          className="position-absolute border-0 d-flex align-items-center justify-content-center"
          onClick={handleClose}
          style={{ 
            top: '10px',
            right: '10px',
            width: '30px',
            height: '30px',
            minWidth: '30px',
            minHeight: '30px',
            borderRadius: '50%',
            backgroundColor: 'white',
            color: '#dc3545',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: 0,
            lineHeight: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#dc3545';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#dc3545';
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </Modal.Header>
      
      <Modal.Body className="py-4 bg-white">
        <p className="mb-0">{mensaje}</p>
      </Modal.Body>
      
      <Modal.Footer className="border-0 justify-content-center bg-white">
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