import React from "react";
import styles from '../paginas/perfil.module.css';


function ListaProyectos ({ onCerrar, onEliminar, onProyectos }) {

    return (
        <div>
        <div className={styles.barra1}>
            <h1> Proyectos </h1>
            <button className={styles.cancelar} onClick={onCerrar}>X</button>
        </div>
        <br/>
        {onProyectos.map((proyecto,i) => (
            <div key={i}>
              <h3> Proyecto {i + 1}: {proyecto.nombre}</h3>
              <p> Descripcion: {proyecto.descripcion} </p>
              <p> Tecnologias usadas: {proyecto.tecnologias}</p>
              <button className="btn btn-sm btn-bordo-danger" onClick={() => onEliminar(proyecto.nombre)}>
                  <i className="bi bi-trash3-fill me-1"></i> Eliminar
              </button>
              <p>-------------------------------------</p>
            </div>
        ))}
        </div>
    );
}

export default ListaProyectos;