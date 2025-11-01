import React from 'react';
import styles from '../paginas/perfil.module.css';
import perfilDefault from '../assets/perfilx.png';

function ModalPerfilUsuario({ usuario, onCerrar }) {
  if (!usuario) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onCerrar} />
      
      {/* Modal */}
      <div className={styles.modalPerfilUsuario}>
        <button className={styles.cerrarModal} onClick={onCerrar}>
          ✕
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img
            src={usuario.fotoPerfil || perfilDefault}
            alt={usuario.nombreUsuario}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #dc2626',
              marginBottom: '1rem'
            }}
          />
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#111', 
            margin: '0 0 0.5rem 0' 
          }}>
            {usuario.nombreUsuario}
          </h2>
        </div>

        <div className={styles.descripcionDestacada}>
          <h4>Sobre mí</h4>
          <p>{usuario.descripcion || 'Sin descripción disponible'}</p>
        </div>

        {usuario.fechaNacimiento && (
          <div className={styles.infoBasica} style={{ marginTop: '1rem' }}>
            <p><strong>📅 Fecha de Nacimiento:</strong> {usuario.fechaNacimiento}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ModalPerfilUsuario;