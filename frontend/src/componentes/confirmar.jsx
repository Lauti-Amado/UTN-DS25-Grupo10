import styles from '../paginas/perfil.module.css';
import React, { useState, useRef, useEffect } from 'react';

function Confirmar({onCancelar, onAceptar}){
    const aceptarCambios=()=>{
        if (onAceptar) {
            onAceptar();
        }
        
    }

return (
    <div className={styles.cuadro}>
      <div className={styles.Confirmo}>Confirmacion de eliminacion</div>
    <div className={styles.texto}><p>¿Estás seguro que querés eliminar esta oferta?</p></div>
    <div className={styles.opciones}>
    <button className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
    <button className="btn btn-bordo-danger" onClick={aceptarCambios}>Sí, eliminar</button>
    </div>
    </div>
);
}

export default Confirmar