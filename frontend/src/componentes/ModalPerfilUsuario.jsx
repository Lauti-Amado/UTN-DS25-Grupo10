import React from 'react';
import styles from '../paginas/perfil.module.css';
import perfilDefault from '../assets/perfilx.png';

function ModalPerfilUsuario({ usuario, proyectos = [], onCerrar }) {
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
        
        {/* Cabecera del perfil */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img
            src={usuario.fotoPerfil || perfilDefault}
            alt={usuario.nombreUsuario}
            className={styles.imagenPerfilGrande}
          />
          <h2 className={styles.nombrePerfilModal}>
            {usuario.nombreUsuario}
          </h2>
        </div>

        {/* Descripción */}
        <div className={styles.descripcionDestacada}>
          <h4>Sobre mí</h4>
          <p>{usuario.descripcion || 'Sin descripción disponible'}</p>
        </div>

        {/* Fecha de nacimiento */}
        {usuario.fechaNacimiento && (
          <div className={styles.infoBasica} style={{ marginTop: '1rem' }}>
            <p><strong>📅 Fecha de Nacimiento:</strong> {usuario.fechaNacimiento.split('T')[0]}</p>
          </div>
        )}

        {/* Sección de Proyectos - Estilo igual al perfil principal */}
        <div className="mt-4">
          <h4 className={styles.tituloSeccion}>Proyectos</h4>
          {proyectos.length === 0 ? (
            <div className={styles.mensajeVacio} style={{ padding: '1rem 0' }}>
              <div className={styles.icono}>📂</div>
              <p>Este usuario aún no ha publicado proyectos.</p>
            </div>
          ) : (
            <div className="row">
              {proyectos.map((proyecto) => (
                <div className="col-12 mb-3" key={proyecto.id}>
                  <div className={styles.tarjetaProyecto}>
                    <h5 className={styles.tituloProyecto}>{proyecto.nombre}</h5>
                    <p className={styles.descripcionProyecto}>{proyecto.descripcion}</p>
                    <div className={styles.tecnologiasProyecto}>
                      {proyecto.tecnologiasUsadas
                        .split(',')
                        .map((tec, i) => (
                          <span key={i} className={styles.tecnologiaChip}>
                            {tec.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ModalPerfilUsuario;