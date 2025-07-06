import React, { useState, useRef, useEffect } from 'react';
import styles from '../paginas/perfil.module.css';


function visualizarproyectos ({ onCerrar, proyectosAgregados }) {

    return (
        <div>
        <p> Hola </p>
        <div className={styles.barra1}>
                <h1>Agregar Proyecto</h1>
                    <button className={styles.cancelar} onClick={onCerrar}>X</button>
              </div>
        {proyectosAgregados.map(proyecto => (
            <div key="muestradeproyectos">
              <h3> Proyecto {proyectosAgregados.length}: {proyectosAgregados.nombre}</h3>
              <p> Descripcion: {proyectosAgregados.descripcion} </p>
              <p> Tecnologias usadas: {proyectosAgregados.tecnologias}</p>
              <p>-------------------------------------</p>
            </div>
        ))}
        </div>
    )
}

export default visualizarproyectos;