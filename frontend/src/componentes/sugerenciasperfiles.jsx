import { useEffect, useState, useContext } from "react";
import Sugerencias from "./sugerencias";
import styles from "../paginas/perfil.module.css";
import { DatosContexto } from "../datosContext";
import perfilDefault from "../assets/perfilx.png";
import { API_URL } from '../config';


function PerfilesSugeridos() {
  const [perfiles, setPerfiles] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const { usuarioLogueado } = useContext(DatosContexto);

  const fetchPerfiles = async () => {
    if (!usuarioLogueado) return;

    setCargando(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token en localStorage");
      }

      const res = await fetch(`${API_URL}/usuarios/sugeridos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      console.log("Respuesta del servidor:", json);

      if (json.success && json.data) {
        setPerfiles(Array.isArray(json.data) ? json.data : []);
      } else {
        throw new Error(json.message || "Error en la respuesta");
      }
    } catch (err) {
      console.error("Error cargando sugeridos:", err);
      setError(err.message);
      setPerfiles([]);
    } finally {
      setCargando(false);
    }
  };

  const refrescarSugerencias = () => {
    fetchPerfiles();
  };

  useEffect(() => {
    fetchPerfiles();
  }, [usuarioLogueado]);

  return (
    <div className={styles.scrollsection}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #dc2626, #ea580c)',
        padding: '1.5rem'
      }}>
        <h2 style={{ margin: 0 }}>Perfiles sugeridos</h2>
        <button
          onClick={refrescarSugerencias}
          disabled={cargando}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            padding: '0.5rem 1rem',
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontSize: '0.75rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            opacity: cargando ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (!cargando) {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!cargando) {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          {cargando ? '🔄' : '🔄 Refrescar'}
        </button>
      </div>

      <div className={styles.scrollcontent}>
        {cargando && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ 
              display: 'inline-block',
              width: '20px',
              height: '20px',
              border: '2px solid #dc2626',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '1rem', color: '#e5e7eb' }}>Cargando sugerencias...</p>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        )}

        {error && (
          <div style={{ 
            padding: '1rem',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '8px',
            margin: '1rem 0'
          }}>
            <p style={{ color: '#dc2626', margin: 0 }}>
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {!cargando && !error && perfiles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#9ca3af' }}>No hay sugerencias disponibles.</p>
            <button
              onClick={refrescarSugerencias}
              style={{
                background: 'linear-gradient(135deg, #dc2626, #ea580c)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '600',
                marginTop: '1rem'
              }}
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {!cargando && !error && perfiles.length > 0 && (
          <>
            {perfiles.map(({ id, nombreUsuario, fotoPerfil, descripcion, rolPostulante }) => (
              <Sugerencias
                key={`${id}-${Date.now()}`} 
                id={id}
                nombre={nombreUsuario}
                descripcion={descripcion}
                rolPostulante={rolPostulante}
                imagen={
                  fotoPerfil
                    ? `${API_URL.replace(/\/$/, '')}/${fotoPerfil.replace(/^\/+/, '')}`
                    : perfilDefault 
                }
              />
            ))}
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <small style={{ color: '#9ca3af' }}>
                Mostrando {perfiles.length} sugerencia{perfiles.length !== 1 ? 's' : ''}
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PerfilesSugeridos;