import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './TrabajoCard.css'; 

const TrabajoCard = ({ titulo, sueldo, imagen }) => {
  return (
    <Card className="d-flex flex-row align-items-center trabajo-card">
      <div className="p-3 flex-grow-1">
        <Card.Title className="fw-bold">{titulo}</Card.Title>
        <Card.Text className="mb-2">Sueldo {sueldo}</Card.Text>
        <Button variant="danger" className="btn-ver-form">Postularse</Button>
      </div>
      <Card.Img
        variant="right"
        src={imagen}
        className="imagen-trabajo"
      />
    </Card>
  );
};

export default TrabajoCard;