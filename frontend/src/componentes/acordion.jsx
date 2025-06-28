import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import OfertaCard from './ofertaCard';
import { useLocation } from 'react-router-dom';

function Acordion() {
    const items = [
  { id: 1, titulo: 'titulo oferta de trabajo 1', contenido: 'Contenido de la sección 1' },
  { id: 2, titulo: 'titulo oferta de trabajo 2', contenido: 'Contenido de la sección 2' },
  { id: 3, titulo: 'titulo oferta de trabajo 3', contenido: 'Contenido de la sección 3' }];
    const location = useLocation(); //funcion para buscar variable
    const s= location.state?.mensaje//valor de la variable mensaje
  return (
    <Accordion defaultActiveKey={s.toString()}>  
      {items.map((item, index) => (
        <Accordion.Item eventKey={index.toString()} key={item.id}>
          <Accordion.Header>{item.titulo}</Accordion.Header>
          <Accordion.Body>{item.contenido}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default Acordion;