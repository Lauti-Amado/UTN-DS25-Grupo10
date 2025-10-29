import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import { API_URL } from '../config';

function NotificacionContratación({ data, usuarioId }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipo, setTipo] = useState("info"); // "info", "warning", "danger"
  const [usuario, setUsuario] = useState(null);
  const [errorUsuario, setErrorUsuario] = useState(null);



  useEffect(() => {
    console.log("Notificación recibida:", { data, usuarioId });


    if (!data || !usuarioId) return;

       setMostrarModal(true);

    if (data === "Ya contrataste anteriormente a este usuario!") {
      setTipo("warning");
    } else if (data === "Ya haz contratado a otro postulante para este puesto!") {
      setTipo("danger");
    } else {
      setTipo("info");
    }

    const fetchUsuario = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token de autenticación");

      const response = await fetch(`${API_URL}/usuarios/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const json = await response.json();
      console.log("Usuario recibido:", json.data);

      setUsuario(json.data); // ajustá según tu backend
    } catch (err) {
      console.error("Error al obtener usuario:", err);
      setErrorUsuario(err.message);
    }
  };

  fetchUsuario();

  }, [data, usuarioId]);

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const icono = {
    warning: "bi bi-exclamation-circle-fill text-warning",
    danger: "bi bi-x-circle-fill text-danger",
    info: "bi bi-check-circle-fill text-success"
  };

  return (
    <Modal show={mostrarModal} onHide={cerrarModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Resultado de la contratación</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <i className={`${icono[tipo]}`} style={{ fontSize: '2rem' }}></i>
        <p className="mt-3">{data}</p>
        {usuario && tipo !== "danger" && (
          <p className="mt-2">
            <strong>Ya puedes contactarte con el postulante elegido vía mail:</strong> {usuario.mail}
          </p>
        )}


      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={cerrarModal}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NotificacionContratación;
