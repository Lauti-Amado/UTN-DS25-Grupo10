import imagen from '../assets/perfilx.png';
import BotonesPerfil from './BotonesPerfil';
import styles from '../paginas/perfil.module.css';
import { DatosContexto } from '../datosContext';
import React, { Component, useContext } from 'react'
function ContenidoInfoPerfil () {
    const {usuarioLogueado} = useContext(DatosContexto)
    
    return (
        <section>
        <div id={styles['chau']}>
          <img src= {imagen} />
          <h3>{usuarioLogueado.nombre}</h3>
          <p> Descripción: <br></br>
              Soy un estudiante de sistemas con ganas de insertarme en el mundo laboral.
              Poseo los conocimientos de algunas tecnologias, idiomas y trabajo en equipo
          </p>
          <p> Fecha de Nacimiento: {usuarioLogueado.fnac} </p>
          <div id={styles['botones']}>
          <BotonesPerfil texto="Editar perfil" />
          <BotonesPerfil texto="Compartir perfil" />
          <BotonesPerfil texto="Agregar proyecto" />
          </div>
        </div>
        </section>
    );
}

export default ContenidoInfoPerfil;