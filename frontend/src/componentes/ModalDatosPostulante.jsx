import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalDatosPostulante = ({ show, handleClose, postulante }) => {
  if (!postulante) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>{postulante.nombre} {postulante.apellido}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Email:</strong> {postulante.email}</p>
        <p><strong>Edad:</strong> {postulante.edad}</p>
        <p><strong>Puesto:</strong> {postulante.puesto}</p>
        <p><strong>Descripción:</strong> {postulante.descripcion}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDatosPostulante;
