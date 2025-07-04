import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContenidoInfoPerfil from '../componentes/ContenidoInfoPerfil';
import PerfilesSugeridos from '../componentes/sugerenciasperfiles';
import Editar from '../componentes/editar';
import styles from './perfil.module.css';
import imagen from '../assets/perfilx.png';  // Importa tu imagen por defecto aquí

export default function Perfil() {
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState(imagen);

  return (
    <div className="vistaEstirada" style={{ position: 'relative' }}>
      <article className={styles.article}>
        <ContenidoInfoPerfil
          onEditarClick={() => setMostrarEditar(true)}
          imagen={imagenPerfil}
        />
        <PerfilesSugeridos />
      </article>

      {mostrarEditar && (
        <>
          <div
            onClick={() => setMostrarEditar(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              zIndex: 1000,
            }}
          />

          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              maxWidth: '90%',
              maxHeight: '90%',
              overflowY: 'auto',
            }}
          >
            <Editar
              onCerrar={() => setMostrarEditar(false)}
              onActualizarPerfil={(nuevaImagen) => {
                setImagenPerfil(nuevaImagen);
                setMostrarEditar(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
