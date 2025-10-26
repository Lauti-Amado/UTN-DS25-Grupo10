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

        <div style={{backgroundColor: '#cfcfcfff', borderRadius: '10px', padding: '10px', marginTop: '10px', textAlign: 'left'}}>
          <p>
            <b>Descripción: </b>{descripcion}
          </p>
          <p><b>Fecha de Nacimiento:</b> {FechaNac}</p>
        </div>
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