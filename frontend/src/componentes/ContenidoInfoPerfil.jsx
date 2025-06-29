import imagen from '../assets/perfilx.png';
import BotonesPerfil from './BotonesPerfil';

function ContenidoInfoPerfil () {

    return (
        <div>
          <img src= {imagen} />
          <h3> Nombre Perfil </h3>
          <p> Descripción: <br></br>
              Soy un estudiante de sistemas con ganas de insertarme en el mundo laboral.
              Poseo los conocimientos de algunas tecnologias, idiomas y trabajo en equipo
          </p>
          <p> Fecha de Nacimiento: 10-02-2002 </p>
          <BotonesPerfil texto="Editar perfil" />
          <BotonesPerfil texto="Compartir perfil" />
          <BotonesPerfil texto="Agregar proyecto" />
        </div>
    );
}

export default ContenidoInfoPerfil;