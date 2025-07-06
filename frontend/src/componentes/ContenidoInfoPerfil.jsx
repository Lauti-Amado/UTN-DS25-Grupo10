import BotonesPerfil from './BotonesPerfil';
import styles from '../paginas/perfil.module.css';
import {DatosContexto} from '../datosContext'
import React, {Component, useContext} from 'react';

function ContenidoInfoPerfil({ onEditarClick, imagen, nombre, descripcion, FechaNac }) {
  const{usuarioLogueado}=useContext(DatosContexto)
  return (
    <section>
      <div id={styles['chau']}>
        <img className={styles.imagenperfil} src={imagen} alt="foto de perfil" />
        <h3>{usuarioLogueado.nombre}</h3>
        <p>
          Descripción:<br/>
          {descripcion}
        </p>
        <p>Fecha de Nacimiento: {usuarioLogueado.fnac}</p>

        <div id={styles['botones']}>
          <BotonesPerfil texto="Editar perfil" onClick={() => onEditarClick('perfil')} />
          <BotonesPerfil texto="Compartir perfil" onClick={()=>onEditarClick('compartir')}/>
          <BotonesPerfil texto="Agregar proyecto" onClick={() => onEditarClick('proyecto')} />
          <BotonesPerfil texto="Visualizar proyectos" onClick={() => onEditarClick('visualizarproyectos')} />
        </div>
      </div>
    </section>
  )
}

export default ContenidoInfoPerfil;