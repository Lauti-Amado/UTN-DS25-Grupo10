import React, { useEffect, useState } from 'react';
import perfilDefault from "../assets/perfilx.png"; // AGREGADO: import de la imagen

function ModalPerfil({ usuarioId, onCerrar }) {
  const [usuario, setUsuario] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarioCompleto = async () => {
      try {
        console.log("Iniciando fetch para usuario ID:", usuarioId);
        setCargando(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No hay token de autenticación");
        }

        console.log("Token encontrado, haciendo request al backend...");

        // Obtener datos del usuario
        const resUsuario = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Respuesta del servidor:", resUsuario.status, resUsuario.statusText);

        if (!resUsuario.ok) {
          const errorText = await resUsuario.text();
          console.error("Error del servidor:", errorText);
          throw new Error(`Error ${resUsuario.status}: ${errorText}`);
        }

        const jsonUsuario = await resUsuario.json();
        console.log("Usuario obtenido:", jsonUsuario);
        setUsuario(jsonUsuario.data);

        // Obtener proyectos del usuario
        try {
          const resProyectos = await fetch(`http://localhost:3000/proyectos/postulado/${usuarioId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (resProyectos.ok) {
            const jsonProyectos = await resProyectos.json();
            console.log("Proyectos obtenidos:", jsonProyectos);
            setProyectos(Array.isArray(jsonProyectos.data) ? jsonProyectos.data : []);
          } else {
            console.warn("No se pudieron cargar proyectos:", resProyectos.status);
            setProyectos([]);
          }
        } catch (proyectosError) {
          console.warn("Error cargando proyectos:", proyectosError);
          setProyectos([]);
        }

      } catch (err) {
        console.error("Error cargando usuario:", err);
        setError(err.message);
      } finally {
        setCargando(false);
        console.log("Fetch completado");
      }
    };

    if (usuarioId) {
      fetchUsuarioCompleto();
    }
  }, [usuarioId]);

  if (!usuarioId) {
    console.warn("ModalPerfil: No se proporcionó usuarioId");
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onCerrar}
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
      
      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1001,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: '800px',
          overflowY: 'auto',
        }}
      >
        <div className="p-4">
          {/* Header con botón cerrar */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Perfil de Usuario</h2>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCerrar}
            ></button>
          </div>

          {cargando && (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2">Cargando perfil...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}

          {usuario && !cargando && !error && (
            <div>
              {/* Información del usuario */}
              <div className="row mb-4">
                <div className="col-md-3 text-center">
                  <img
                    src={
                      usuario.fotoPerfil
                        ? `http://localhost:3000${usuario.fotoPerfil}`
                        : perfilDefault // CORREGIDO: usar import en lugar de require
                    }
                    alt="Foto de perfil"
                    className="rounded-circle"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      border: '3px solid #e9ecef'
                    }}
                  />
                </div>
                <div className="col-md-9">
                  <h3>{usuario.nombre}</h3>
                  <p className="text-muted mb-2">@{usuario.nombreUsuario}</p>
                  <p className="text-muted mb-2">{usuario.mail}</p>
                  
                  {usuario.fechaNacimiento && (
                    <p className="text-muted mb-2">
                      <strong>Fecha de nacimiento:</strong> {new Date(usuario.fechaNacimiento).toLocaleDateString()}
                    </p>
                  )}
                  
                  <span className={`badge ${usuario.rolPostulante ? 'bg-primary' : 'bg-success'}`}>
                    {usuario.rolPostulante ? 'Postulante' : 'Empleador'}
                  </span>
                  
                  {usuario.descripcion && (
                    <div className="mt-3">
                      <h6>Descripción:</h6>
                      <p className="text-muted">{usuario.descripcion}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Proyectos del usuario */}
              <div className="mt-4">
                <h4 className="mb-3">Proyectos ({proyectos.length})</h4>
                {proyectos.length === 0 ? (
                  <p className="text-muted">Este usuario no tiene proyectos públicos.</p>
                ) : (
                  <div className="row">
                    {proyectos.map((proyecto) => (
                      <div className="col-md-6 mb-3" key={proyecto.id}>
                        <div className="card h-100">
                          <div className="card-body">
                            <h6 className="card-title">{proyecto.nombre}</h6>
                            <p className="card-text small">{proyecto.descripcion}</p>
                            <div className="mt-2">
                              <small className="text-muted">
                                <strong>Tecnologías:</strong>
                              </small>
                              <div className="mt-1">
                                {proyecto.tecnologiasUsadas.split(",").map((tec, i) => (
                                  <span
                                    key={i}
                                    className="badge bg-secondary me-1 mb-1"
                                    style={{ fontSize: '0.7rem' }}
                                  >
                                    {tec.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ModalPerfil;