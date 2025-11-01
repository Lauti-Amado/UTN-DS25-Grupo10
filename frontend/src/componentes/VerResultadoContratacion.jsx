import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';

function VerResultadoContratacion({ data, onClose }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipo, setTipo] = useState("info");

  useEffect(() => {
    console.log("Notificación recibida:", { data });

    if (data) {
      setMostrarModal(true);

      if (data === "Haz sido contratado para esta oferta. Pronto tu empleador se comunicará contigo. Felicitaciones!") {
        setTipo("contratado");
      } else if (data === "Lamentamos comunicarte que otro usuario ha sido seleccionado para esta oferta.") {
        setTipo("rechazado");
      } else {
        setTipo("espera");
      }
    }
  }, [data]);

  const cerrarModal = () => {
    setMostrarModal(false);
    if (onClose) {
      onClose();
    }
  };

  const icono = {
    contratado: "bi bi-patch-check",
    espera: "bi bi-clock-history",
    rechazado: "bi bi-emoji-frown"
  };

  return (
    <Modal show={mostrarModal} onHide={cerrarModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Resultado</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <i className={`${icono[tipo]}`} style={{ fontSize: '2rem' }}></i>
        <p className="mt-3">{data}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={cerrarModal}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VerResultadoContratacion;