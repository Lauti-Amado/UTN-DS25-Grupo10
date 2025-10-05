import BotonesPerfil from './BotonesPerfil';
import styles from '../paginas/perfil.module.css';
import React, {Component, useContext} from 'react';
import { DatosContexto } from '../datosContext.jsx';

function ContenidoInfoPerfil({ onEditarClick, imagen, nombre, descripcion, FechaNac }) {

  
  const { busquedaGlobal, usuarioLogueado } = useContext(DatosContexto);

  return (
    <section className="seccionPerfil">
      <div id={styles['chau']}>
        <img className={styles.imagenperfil} src={imagen} alt="foto de perfil" />
        <h3 className={styles.text}>{nombre}</h3>
        <p className={styles.text}>
          Descripción:{descripcion}
        </p>
        <p className={styles.text}>Fecha de Nacimiento: {FechaNac}</p>

        <div id={styles['botones']}>
          <BotonesPerfil texto="Editar perfil" onClick={() => onEditarClick('perfil')} />
          <BotonesPerfil texto="Compartir perfil" onClick={() =>onEditarClick('compartir')}/>
          {usuarioLogueado.rolPostulante && ( // 👈 solo se muestra si es true
            <BotonesPerfil texto="Agregar proyecto" onClick={() => onEditarClick('proyecto')} />
          )}

        </div>
      </div>
    </section>
  )
}

export default ContenidoInfoPerfil;