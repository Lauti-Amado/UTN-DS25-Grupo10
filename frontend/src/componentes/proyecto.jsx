import React, { useState, useRef, useEffect } from 'react';
import styles from '../paginas/perfil.module.css';
import { proyectoSchema } from '../validations/proyecto.js';
import NotificacionModal from './NotificacionModal'; // Ajusta la ruta según tu proyecto



function Proyecto({ onCerrar, onActualizarPerfil, onAgregarProyecto, nombre, 
  descripcion, tecnologias, onModificarProyecto }) {
  const [nuevoNombre, setNombre] = useState(nombre || '');
  const [Descripcion, setDescripcion] = useState(descripcion || '');
  const [Tecnologias, setTecnologias] = useState(tecnologias || '');
  const fileInputRef = useRef(null);
  const [notificacion, setNotificacion] = useState({ show: false, titulo: '', mensaje: '', tipo: 'warning' });


  useEffect(() => {
    setNombre(nombre);
    setDescripcion(descripcion);
    setTecnologias(tecnologias);
  }, [nombre, descripcion, tecnologias]);

 const mostrarNotificacion = (titulo, mensaje, tipo = 'warning') => {
  setNotificacion({ show: true, titulo, mensaje, tipo });
};

const validarProyecto = async () => {
  const proyectoData = {
    nombre: nuevoNombre,
    descripcion: Descripcion,
    tecnologias: Tecnologias,
  };

  try {
    await proyectoSchema.validate(proyectoData, { abortEarly: false });
    return true;
  } catch (err) {
    if (err.inner && err.inner.length > 0) {
      err.inner.forEach(e => {
        err.inner.forEach(e => {
        mostrarNotificacion('Error de validación', e.message, 'warning');
        });
 // O usa tu propio sistema de notificación
      });
    } else {
      alert(err.message);
    }
    return false;
  }
};


const aceptarCambios = async () => {
  const esValido = await validarProyecto();
  if (!esValido) return;

  if (onAgregarProyecto) {
    onAgregarProyecto({ nombre: nuevoNombre, descripcion: Descripcion, tecnologias: Tecnologias });
  }

  if (onModificarProyecto) {
    onModificarProyecto(nuevoNombre, Descripcion, Tecnologias);
  }

  if (onCerrar) onCerrar();
};


  return (
    <div>
      <div className={styles.barra1}>
        <h1>Agregar Proyecto</h1>
        <button className={styles.cancelar} onClick={onCerrar}>X</button>
      </div>
      <div className={styles.b}>
      <div className={styles.barra3}>
        <input
          className={styles.co}
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label>Nombre</label>
      </div>

      <div className={styles.barra3}>
        <input
          className={styles.co}
          type="text"
          value={Descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <label>Descripción</label>
      </div>
     
      
      <div className={styles.barra3}>
        <input
          className={styles.co}
          type="text"
          value={Tecnologias}
          onChange={(e) => setTecnologias(e.target.value)}
        />
        <label>Tecnologias Usadas</label>
      </div>
      </div>
      <div>
      <button className="btn btn-bordo-danger" 
        onClick={() => {aceptarCambios()}}>Aceptar</button>
        <NotificacionModal
        show={notificacion.show}
        handleClose={() => setNotificacion({ ...notificacion, show: false })}
        titulo={notificacion.titulo}
        mensaje={notificacion.mensaje}
        tipo={notificacion.tipo}
/>

    </div>
    </div>
    
  );
}

export default Proyecto;
