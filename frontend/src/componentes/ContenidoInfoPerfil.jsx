 import React from 'react';
import BotonesPerfil from './BotonesPerfil';
import styles from '../paginas/perfil.module.css';

function ContenidoInfoPerfil({ onEditarClick, imagen, nombre, descripcion, FechaNac }) {
  return (
    <section>
      <div id={styles['chau']}>
        <img className={styles.imagenperfil} src={imagen} alt="foto de perfil" />
        <h3>{nombre}</h3>
        <p>
          Descripción: <br />
          {descripcion}
        </p>
        <p>Fecha de Nacimiento: {FechaNac}</p>

        <div id={styles['botones']}>
          <BotonesPerfil texto="Editar perfil" onClick={() => onEditarClick('perfil')} />
          <BotonesPerfil texto="Compartir perfil" onClick={()=>onEditarClick('compartir')}/>
          <BotonesPerfil texto="Agregar proyecto" onClick={() => onEditarClick('proyecto')} />
        </div>
      </div>
    </section>
  );
}

export default ContenidoInfoPerfil;