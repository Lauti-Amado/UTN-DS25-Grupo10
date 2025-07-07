import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import styles from '../paginas/perfil.module.css';


function Compartir({onCerrar}) {
    const alertClicked = () => {
    alert('Compartir');
  };
    const CerrarTodo =()=>{
    if (onCerrar) onCerrar();
    }

  return (
    <div className={styles.recuadroEmpresas}>
        <div className={styles.barra11}>
        <h3> Compartir por... </h3>
        <button onClick={onCerrar} className={styles.cancelar2}>X</button>
        </div>
        <ListGroup>
            <ListGroup.Item  action onClick={alertClicked} className={styles.itemLista}>
                <Image src="../Facebook_Logo_(2019).png" roundedCircle className={styles.logoEmpresa} />
                <p className={styles.nombreEmpresa}>Facebook</p>
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked} className={styles.itemLista}>
                <Image src="../WhatsApp.svg.png" roundedCircle className={styles.logoEmpresa} />
                <p className={styles.nombreEmpresa}>Whatsapp</p>
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked} className={styles.itemLista}>
                <Image src="../logoInsta2.png" roundedCircle className={styles.logoEmpresa} />
                <p className={styles.nombreEmpresa}>Instagram</p>
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked} className={styles.itemLista}>
                <Image src="../linkedin.png" roundedCircle className={styles.logoEmpresa} />
                <p className={styles.nombreEmpresa}>Linkedin</p>
            </ListGroup.Item>

           
        </ListGroup>
    </div>
  );
}

export default Compartir;