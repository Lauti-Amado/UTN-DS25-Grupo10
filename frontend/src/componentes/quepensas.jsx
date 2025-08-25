import React, { useState, useEffect } from 'react';
import styles from '../paginas/perfil.module.css';

function Pensamiento({ nombre }) {
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [usuario, setUsuario] = useState(nombre || '');

  useEffect(() => {
    setUsuario(nombre);
  }, [nombre]);

  const publicarComentario = () => {
    if (nuevoComentario.trim() === '') return;
    const nuevo = {
      id: Date.now(),
      texto: nuevoComentario,
      autor: usuario
    };
    setComentarios([nuevo, ...comentarios]); // agregamos al inicio
    setNuevoComentario('');
  };

  return (
    <div style={{ backgroundColor:'white', marginBottom: '10px', fontWeight: 'bold', fontSize: '18px' }}>
    Tus pensamientos
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      {/* Input para nuevo comentario */}
      <div className={styles.barra3} style={{ marginBottom: '10px' }}>
        <input
          style={{ borderBottom: "1px solid grey", width: '80%', padding: '5px' }}
          placeholder='Escribe un comentario...'
          type="text"
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && publicarComentario()}
        />
        <button
          className="btn btn-bordo-danger"
          style={{ marginLeft: '10px' }}
          onClick={publicarComentario}
        >
          Publicar
        </button>
      </div>

      {/* Lista de comentarios */}
      <div style={{ marginTop: '20px' }}>
        {comentarios.length === 0 && <p style={{ color: 'grey' }}>No hay comentarios todavía.</p>}
        {comentarios.map((c) => (
          <div key={c.id} style={{textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <strong>{c.autor}:</strong> {c.texto}
          </div>
        ))}
      </div>
    </div>
     </div>
  );
}

export default Pensamiento;
