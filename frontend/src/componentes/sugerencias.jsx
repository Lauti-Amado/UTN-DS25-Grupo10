import { useState } from 'react';
import styles from "../paginas/perfil.module.css";
import ModalPerfil from './ModalPerfil';
import perfilDefault from "../assets/perfilx.png";

function Sugerencias({ id, nombre, imagen, descripcion, rolPostulante }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirPerfil = () => {
    console.log("Abriendo perfil para usuario:", id, nombre);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    console.log("Cerrando modal");
    setMostrarModal(false);
  };

  // Usar imagen por defecto si no hay imagen o si hay error
  const imagenSrc = imagen || perfilDefault;

  return (
    <>
      <div className={styles.unperfil}>
        <h2>{nombre}</h2>
        <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
          <span 
            className="badge"
            style={{
              background: rolPostulante ? '#3b82f6' : '#10b981',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '0.65rem',
              fontWeight: '600'
            }}
          >
            {rolPostulante ? 'Postulante' : 'Empleador'}
          </span>
        </div>
        {descripcion && (
          <p style={{ 
            fontSize: '0.8rem', 
            color: '#9ca3af', 
            margin: '0.5rem 0',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {descripcion}
          </p>
        )}
        <div className={styles.perfil}>
          <button onClick={abrirPerfil} className={styles.btnVerForm}>
            Ver perfil
          </button>
          <img 
            className={styles.imagenPerfil} 
            src={imagenSrc} 
            alt="imgperfil"
            onError={(e) => {
              console.warn("Error cargando imagen:", imagen);
              e.target.src = perfilDefault;
            }}
          />
        </div>
      </div>

      {mostrarModal && (
        <ModalPerfil
          usuarioId={id}
          onCerrar={cerrarModal}
        />
      )}
    </>
  );
}

export default Sugerencias;