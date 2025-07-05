import React from "react";
import './cuadroEmpDest.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";

function CuadroEmpDest() {
  const navigate = useNavigate();

  // función que navega a la empresa específica
  const irAEmpresa = (nombreEmpresa) => {
    navigate('/empresas-destacadas', { state: { empresaDestino: nombreEmpresa } });
  };

  return (
    <div className="recuadroEmpresas">
      <h3>Empresas Destacadas</h3>
      <ListGroup>

        <ListGroup.Item action className="itemLista" onClick={() => irAEmpresa("Facebook")}>
          <Image src="../Facebook_Logo_(2019).png" roundedCircle className="logoEmpresa" />
          <p className="nombreEmpresa">Facebook</p>
        </ListGroup.Item>

        <ListGroup.Item action className="itemLista" onClick={() => irAEmpresa("Coca-Cola")}>
          <Image src="../logoCocaCola.png" roundedCircle className="logoEmpresa" />
          <p className="nombreEmpresa">Coca Cola</p>
        </ListGroup.Item>

        <ListGroup.Item action className="itemLista" onClick={() => irAEmpresa("Instagram")}>
          <Image src="../logoInsta2.png" roundedCircle className="logoEmpresa" />
          <p className="nombreEmpresa">Instagram</p>
        </ListGroup.Item>

        <ListGroup.Item action className="itemLista" onClick={() => irAEmpresa("Mercado Libre")}>
          <Image src="../logoMercadoLibre.png" roundedCircle className="logoEmpresa" />
          <p className="nombreEmpresa">Mercado Libre</p>
        </ListGroup.Item>

      </ListGroup>

      <div className="mt-2">
        <button
          onClick={() => navigate("/empresas-destacadas")}
          className="btn btn-secondary w-100"
        >
          Ver más empresas
        </button>
      </div>
    </div>
  );
}

export default CuadroEmpDest;
