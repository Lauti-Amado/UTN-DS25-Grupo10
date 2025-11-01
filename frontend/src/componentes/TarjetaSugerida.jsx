import React from 'react';
import styles from '../paginas/perfil.module.css';
import perfilDefault from '../assets/perfilx.png';

function TarjetaSugerida({ nombreUsuario, fotoPerfil, descripcion, onVerPerfil }) {
  // Truncar descripción a 60 caracteres
  const descripcionCorta = descripcion?.length > 60 
    ? descripcion.substring(0, 60) + '...' 
    : descripcion;

  return (
    <div className={styles.tarjetaSugerida}>
      <div className={styles.tarjetaSugeridaHeader}>
        <img
          src={fotoPerfil || perfilDefault}
          alt={`Foto de ${nombreUsuario}`}
          className={styles.avatarSugerido}
        />
        <div style={{ flex: 1 }}>
          <h3>{nombreUsuario}</h3>
        </div>
      </div>
      <button className={styles.btnVerPerfil} onClick={onVerPerfil}>
         Ver perfil
      </button>
    </div>
  );
}

export default TarjetaSugerida;