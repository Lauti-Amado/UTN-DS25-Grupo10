import imagen from '../assets/perfilx.png';
import BotonesPerfil from './BotonesPerfil';
import styles from '../paginas/perfil.module.css';

function ContenidoInfoPerfil () {

    return (
        <section>
        <div id={styles['chau']}>
          <img src= {imagen} />
          <h3> Nombre Perfil </h3>
          <p> Descripción: <br></br>
              Soy un estudiante de sistemas con ganas de insertarme en el mundo laboral.
              Poseo los conocimientos de algunas tecnologias, idiomas y trabajo en equipo
          </p>
          <p> Fecha de Nacimiento: 10-02-2002 </p>
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