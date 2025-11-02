import styles from '../paginas/perfil.module.css';
import React, { useContext } from 'react';
import { DatosContexto } from '../datosContext.jsx';


function ContenidoInfoPerfil({ onEditarClick, imagen, nombre, descripcion, FechaNac, mail }) {
  const { usuarioLogueado } = useContext(DatosContexto);

  const rutaImagen = imagen?.startsWith('http') 
    ? imagen 
    : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${imagen}`;

  return (
    <section className={styles.seccionPerfil}>
      <div className={styles.perfilLayout}>
        <img src={rutaImagen} alt="foto de perfil" className={styles.imagenPerfil}
        onError={(e) => {
          e.target.src = imagenDefault;
        }} 
      />

        <div className={styles.infoPerfil}>
          <h3 className={styles.nombrePerfil}>{nombre}</h3>
          <br />
          <br />
          
          <div className={styles.infoBasica}>
            <p>
              <strong>📅 Fecha de Nacimiento:</strong>{' '}
              {FechaNac || <span style={{ color: '#999', fontStyle: 'italic' }}>No especificada</span>}
            </p>

           
          </div>

             <div className={styles.infoBasica}>
             <p>
            <strong>✉️ Contacto:</strong> {mail}
            </p>
          </div>

          {/* Descripción como sección destacada */}
          <div className={styles.descripcionDestacada}>
            <h4>Sobre mí</h4>
            <p>{descripcion}</p>
          </div>

          <div className={styles.botonesPerfil}>
            <button onClick={() => onEditarClick('perfil')}>
              ✏️ Editar perfil
            </button>
            <button onClick={() => onEditarClick('compartir')}>
              🔗 Compartir
            </button>
            {usuarioLogueado.rolPostulante && (
              <button onClick={() => onEditarClick('proyecto')}>
                ➕ Agregar proyecto
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContenidoInfoPerfil;