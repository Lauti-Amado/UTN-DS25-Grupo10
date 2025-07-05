import React, { useState, useRef, useEffect } from 'react';
import imagen from '../assets/perfilx.png';
import styles from '../paginas/perfil.module.css';

function Editar({ onCerrar, onActualizarPerfil, nombre, descripcion, FechaNac, imagen }) {
  const [previewSrc, setPreviewSrc] = useState(imagen);
  const [nuevoNombre, setNuevoNombre] = useState(nombre || '');
  const [nuevaDescripcion, setNuevaDescripcion] = useState(descripcion || '');
  const [nuevaFechaNac, setNuevafecha]= useState(FechaNac || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setNuevoNombre(nombre);
    setNuevaDescripcion(descripcion);
    setNuevafecha(FechaNac);
    setPreviewSrc(imagen);
  }, [nombre, descripcion, FechaNac, imagen]);

  const abrirSelector = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      const lector = new FileReader();
      lector.onload = (event) => {
        setPreviewSrc(event.target.result);
      };
      lector.readAsDataURL(archivo);
    } else {
      alert('Por favor selecciona una imagen válida.');
    }
  };

  const aceptarCambios = () => {
    if (onActualizarPerfil) {
      onActualizarPerfil(previewSrc, nuevoNombre, nuevaDescripcion, nuevaFechaNac);
    }
    if (onCerrar) onCerrar();
  };

  return (
     <div>
      <div className={styles.barra1}>
        <h1>Editar Perfil</h1>
        <button className={styles.cancelar} onClick={onCerrar}>X</button>
      </div>
     
      <div className={styles.barra2}>
        <button className={styles.fotoper} onClick={abrirSelector}>Editar foto de perfil</button>
        <input
          className={styles.imagenPerfill}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <img src={previewSrc} className={styles.imagenPerfill} alt="Vista previa" />
      </div>

      <div className={styles.barra3}>
        <input
          placeholder="nombre"
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <label>Nombre</label>
      </div>

      <div className={styles.barra3}>
        <input
          type="text"
          value={nuevaDescripcion}
          onChange={(e) => setNuevaDescripcion(e.target.value)}
        />
        <label>Descripción</label>
      </div>

      <div className={styles.barra3}>
        <input
          type="date"
          value={FechaNac}
          onChange={(e) => setNuevafecha(e.target.value)}
        />
        <label>Fecha de Nacimiento</label>
      </div>

      <button className={styles.aceptar} onClick={aceptarCambios}>Aceptar</button>
      </div>
  );
}

export default Editar;