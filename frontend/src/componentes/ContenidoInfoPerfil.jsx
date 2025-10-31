import BotonesPerfil from './BotonesPerfil';
import styles from '../paginas/perfil.module.css';
import React, {Component, useContext} from 'react';
import { DatosContexto } from '../datosContext.jsx';

function ContenidoInfoPerfil({ onEditarClick, imagen, nombre, descripcion, FechaNac }) {

  
  const { busquedaGlobal, usuarioLogueado } = useContext(DatosContexto);

  return (
    <section className={styles.seccionPerfil}>
      <div className={styles.perfilLayout}>
        <img src={imagen} alt="foto de perfil" className={styles.imagenPerfil} />

        <div className={styles.infoPerfil}>
          <h3>{nombre}</h3>
          <p><strong>Descripción:</strong> {descripcion}</p>
          <p><strong>Fecha de Nacimiento:</strong> {FechaNac}</p>

        <div className={styles.botonesPerfil}>
          <button onClick={() => onEditarClick('perfil')}>Editar perfil</button>
          <button onClick={() => onEditarClick('compartir')}>Compartir</button>
          {usuarioLogueado.rolPostulante && (
            <button onClick={() => onEditarClick('proyecto')}>Agregar proyecto</button>
          )}
        </div>

        </div>
      </div>
    </section>
  )
}

export default ContenidoInfoPerfil;