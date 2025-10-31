import React from 'react';
import styles from '../paginas/perfil.module.css';
import perfilDefault from '../assets/perfilx.png';

function TarjetaSugerida({ nombreUsuario, fotoPerfil, descripcion }) {
  return (
    <div className={styles.tarjetaSugerida}>
      <img
        src={fotoPerfil || perfilDefault}
        alt={`Foto de ${nombreUsuario}`}
        className={styles.avatarSugerido}
      />
      <div>
        <h3>{nombreUsuario}</h3>
        <p>{descripcion}</p>
      </div>
    </div>
  );
}

export default TarjetaSugerida;