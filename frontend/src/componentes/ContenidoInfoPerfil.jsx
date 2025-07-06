import BotonesPerfil from './BotonesPerfil';
import styles from '../paginas/perfil.module.css';
import React, {Component, useContext} from 'react';

function ContenidoInfoPerfil({ onEditarClick, imagen, nombre, descripcion, FechaNac }) {
  return (
    <section className="seccionPerfil">
      <div id={styles['chau']}>
        <img className={styles.imagenperfil} src={imagen} alt="foto de perfil" />
        <h3>{nombre}</h3>
        <p>
          Descripción:<br/>
          {descripcion}
        </p>
        <p>Fecha de Nacimiento: {FechaNac}</p>

        <div id={styles['botones']}>
          <BotonesPerfil texto="Editar perfil" onClick={() => onEditarClick('perfil')} />
          <BotonesPerfil texto="Compartir perfil" onClick={() =>onEditarClick('compartir')}/>
          <BotonesPerfil texto="Agregar proyecto" onClick={() => onEditarClick('proyecto')} />
          <BotonesPerfil texto="Visualizar proyectos" onClick={() => onEditarClick('verproyectos')} />
        </div>
      </div>
    </section>
  )
}

export default ContenidoInfoPerfil;