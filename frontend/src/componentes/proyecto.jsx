import React, { useState, useRef, useEffect } from 'react';
import styles from '../paginas/perfil.module.css';

function Proyecto({ onCerrar, onActualizarPerfil, onAgregarProyecto, nombre, descripcion, tecnologias }) {
  const [nuevoNombre, setNombre] = useState(nombre || '');
  const [Descripcion, setDescripcion] = useState(descripcion || '');
  const [Tecnologias, setTecnologias] = useState(tecnologias || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setNombre(nombre);
    setDescripcion(descripcion);
    setTecnologias(tecnologias);
  }, [nombre, descripcion, tecnologias]);

 
  const aceptarCambios = () => {
    if (onActualizarPerfil) {
      onAgregarProyecto({nombre: nuevoNombre, descripcion: Descripcion, tecnologias: Tecnologias});
      onActualizarPerfil(nuevoNombre, Descripcion, Tecnologias);
      //agregarProyecto(nuevoNombre, Descripcion, Tecnologias);
    }
    if (onCerrar) onCerrar();
  };

  return (
    <div>
      <div className={styles.barra1}>
        <h1>Agregar Proyecto</h1>
        <button className={styles.cancelar} onClick={onCerrar}>X</button>
      </div>

      <div className={styles.barra3}>
        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label>Nombre</label>
      </div>

      <div className={styles.barra3}>
        <input
          type="text"
          value={Descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <label>Descripción</label>
      </div>

      
      <div className={styles.barra3}>
        <input
          type="text"
          value={Tecnologias}
          onChange={(e) => setTecnologias(e.target.value)}
        />
        <label>Tecnologias Usadas</label>
      </div>


      <button className={styles.aceptar} 
        onClick={() => {aceptarCambios()}}>Aceptar</button>
    </div>
  );
}

export default Proyecto;
