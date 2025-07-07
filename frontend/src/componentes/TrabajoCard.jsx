import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './TrabajoCard.css';

const TrabajoCard = ({ EsTrabajo, titulo, sueldo, rol, imagen, onPostular }) => {
  return (
    <Card className="trabajo-card-horizontal">
      <div className="imagen-container">
        <img src={imagen} alt={titulo} className="imagen-avatar-grande" />
      </div>
      <Card.Body className="contenido-card">
        <Card.Title className="fw-bold mb-1">{titulo}</Card.Title>
        <Card.Text className="mb-1">
          {EsTrabajo ? `Sueldo ${sueldo}` : rol}
        </Card.Text>
        <Button
          variant="danger"
          className="btn-ver-form"
          onClick={EsTrabajo && onPostular ? onPostular : undefined}
        >
          {EsTrabajo ? "Postularse" : "Ver datos"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TrabajoCard;
