import React from "react";
import './cuadroEmpDest.css'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";


function CuadroEmpDest() {
    const alertClicked = () => {
    alert('You clicked the third ListGroupItem');
  };
  return (
    <div className="recuadroEmpresas">
        <h3>Empresas Destacadas</h3>
        <ListGroup>
            <ListGroup.Item  action onClick={alertClicked} className="itemLista">
                <Image src="../public/Facebook_Logo_(2019).png" roundedCircle className="logoEmpresa" />
                <p className="nombreEmpresa">Facebook</p>
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked} className="itemLista">
                <Image src="../public/logoCocaCola.png" roundedCircle className="logoEmpresa" />
                <p className="nombreEmpresa">Coca Cola</p>
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked} className="itemLista">
                <Image src="../public/logoInsta2.png" roundedCircle className="logoEmpresa" />
                <p className="nombreEmpresa">Instagraam</p>
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked} className="itemLista">
                <Image src="../public/logoMercadoLibre.png" roundedCircle className="logoEmpresa" />
                <p className="nombreEmpresa">Mercado libre</p>
            </ListGroup.Item>

           
        </ListGroup>

        <Link style={{color:"white"}} to={"/"}>Ver mas</Link>
    </div>
  );
}

export default CuadroEmpDest;