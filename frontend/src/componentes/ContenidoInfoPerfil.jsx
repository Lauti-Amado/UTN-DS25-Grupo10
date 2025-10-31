import styles from '../paginas/perfil.module.css';
import React, { useContext } from 'react';
import { DatosContexto } from '../datosContext.jsx';

function ContenidoInfoPerfil({ onEditarClick, imagen, nombre, descripcion, FechaNac }) {
  const { usuarioLogueado } = useContext(DatosContexto);

  return (
    <section className={styles.seccionPerfil}>
      <div className={styles.perfilLayout}>
        <img src={imagen} alt="foto de perfil" className={styles.imagenPerfil} />

        <div className={styles.infoPerfil}>
          <h3 className={styles.nombrePerfil}>{nombre}</h3>
          <br />
          <br />
          
          <div className={styles.infoTexto}>
            <p><strong>Descripción:</strong> {descripcion}</p>
            <br />
            <p><strong>Fecha de Nacimiento:</strong> {FechaNac}</p>
            <br />
          </div>

          <div className={styles.botonesPerfil}>
            <button onClick={() => onEditarClick('perfil')}>Editar perfil</button>
            <button onClick={() => onEditarClick('compartir')}>Compartir</button>
            {usuarioLogueado.rolPostulante && (
              <button onClick={() => onEditarClick('proyecto')}>Agregar proyecto</button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContenidoInfoPerfil;