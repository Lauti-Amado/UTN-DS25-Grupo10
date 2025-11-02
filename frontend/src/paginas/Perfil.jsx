import React, { useRef, useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContenidoInfoPerfil from '../componentes/ContenidoInfoPerfil';
import Editar from '../componentes/editar';
import Proyecto from '../componentes/proyecto';
import imagen from '../assets/perfilx.png';
import Compartir from '../componentes/compartir';
import Confirmar from '../componentes/confirmar';
import Sugerencias from '../componentes/sugerencias';
import ModalPerfilUsuario from '../componentes/ModalPerfilUsuario';
import styles from '../paginas/perfil.module.css';
import { DatosContexto } from '../datosContext';
import { API_URL } from '../config';
import perfilDefault from '../assets/perfilx.png';

export default function Perfil() {
  const [proyectosPerfilSeleccionado, setProyectosPerfilSeleccionado] = useState([]);
  const [mostrarExitoAgregar, setMostrarExitoAgregar] = useState(false);
  const [mostrarExitoModificar, setMostrarExitoModificar] = useState(false);
  const [mostrarExitoEliminar, setMostrarExitoEliminar] = useState(false);
  const [modoEditar, setModoEditar] = useState(null);
  const [proyectoaEliminar, setProyectoaEliminar] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [modificarProyecto, setModificarProyecto] = useState(null);
  const [imagenPerfil, setImagenPerfil] = useState(imagen);
  const [nombrePerfil, setNombrePerfil] = useState('Nombre Perfil');
  const [descripcionPerfil, setDescripcionPerfil] = useState(
    'Soy un estudiante de sistemas con ganas de insertarme en el mundo laboral. Poseo conocimientos en tecnologías, idiomas y trabajo en equipo.'
  );
  const [FechaNac, setNuevafecha] = useState('');
  const [proyectosagregados, setProyectosAgregados] = useState([]);
  const [perfilesSugeridos, setPerfilesSugeridos] = useState([]);
  const [busquedaPerfil, setBusquedaPerfil] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  const [mostrarExitoPerfil, setMostrarExitoPerfil] = useState(false);
  const [cargandoSugeridos, setCargandoSugeridos] = useState(false);

  const { usuarioLogueado } = useContext(DatosContexto);

  const editarRef = useRef(null);
  const compartirRef = useRef(null);
  const proyectoRef = useRef(null);

  useEffect(() => {
    if (usuarioLogueado) {
      setNombrePerfil(usuarioLogueado.nombreUsuario || 'Nombre Perfil');
      setDescripcionPerfil(usuarioLogueado.descripcion || '');
      setImagenPerfil(usuarioLogueado.fotoPerfil || imagen);
      setNuevafecha(usuarioLogueado.fechaNacimiento || '');
    }
  }, [usuarioLogueado]);

  // Cargar perfiles sugeridos iniciales
  const cargarPerfilesSugeridos = async () => {
    setCargandoSugeridos(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/usuarios/sugeridos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setPerfilesSugeridos(json.data);
      }
    } catch (error) {
      console.error('Error al obtener perfiles sugeridos:', error);
    } finally {
      setCargandoSugeridos(false);
    }
  };

  useEffect(() => {
    cargarPerfilesSugeridos();
  }, []);

  const refrescarSugeridos = () => {
    setBusquedaPerfil('');
    setResultadosBusqueda([]);
    cargarPerfilesSugeridos();
  };

  useEffect(() => {
    if (!busquedaPerfil.trim()) {
      setResultadosBusqueda([]);
      setBuscando(false);
      return;
    }

    const timer = setTimeout(async () => {
      if (busquedaPerfil.trim().length < 2) {
        setResultadosBusqueda([]);
        setBuscando(false);
        return;
      }

      setBuscando(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${API_URL}/usuarios/buscar?query=${encodeURIComponent(busquedaPerfil)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const json = await res.json();
        if (json.success) {
          setResultadosBusqueda(json.data);
        }
      } catch (error) {
        console.error('Error en búsqueda:', error);
        setResultadosBusqueda([]);
      } finally {
        setBuscando(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [busquedaPerfil]);

  // Decidir qué perfiles mostrar
  const perfilesMostrados = busquedaPerfil.trim() ? resultadosBusqueda : perfilesSugeridos;

  const handleScroll = (seccion) => {
    setModoEditar(seccion);
    setTimeout(() => {
      const refs = {
        perfil: editarRef,
        compartir: compartirRef,
        proyecto: proyectoRef,
      };
      const ref = refs[seccion];
      if (ref?.current) ref.current.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  // Cargar proyectos del perfil seleccionado
  useEffect(() => {
    if (!perfilSeleccionado) {
      setProyectosPerfilSeleccionado([]);
      return;
    }

    const cargarProyectosDelUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/proyectos/postulado/${perfilSeleccionado.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setProyectosPerfilSeleccionado(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error('Error al cargar proyectos del perfil sugerido:', error);
        setProyectosPerfilSeleccionado([]);
      }
    };

    cargarProyectosDelUsuario();
  }, [perfilSeleccionado]);

  useEffect(() => {
    const fetchProyectos = async () => {
      if (!usuarioLogueado?.rolPostulante) return;
      try {
        const res = await fetch(`${API_URL}/proyectos/postulado/${usuarioLogueado.id}`);
        const json = await res.json();
        setProyectosAgregados(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error('Error al traer proyectos:', err);
      }
    };
    fetchProyectos();
  }, [usuarioLogueado]);

  const eliminarProyecto = async (id) => {
    try {
      await fetch(`${API_URL}/proyectos/${id}`, { method: 'DELETE' });
      setProyectosAgregados((prev) => prev.filter((p) => p.id !== id));
      setMostrarConfirmacion(false);
      setMostrarExitoEliminar(true);
      setProyectoaEliminar(null);
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  };

  const modificarProyectoBD = async (id, nuevoNombre, nuevaDescripcion, nuevasTecnologias) => {
    try {
      const res = await fetch(`${API_URL}/proyectos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nuevoNombre,
          descripcion: nuevaDescripcion,
          tecnologiasUsadas: nuevasTecnologias,
        }),
      });
      const json = await res.json();
      setProyectosAgregados((prev) => prev.map((p) => (p.id === id ? json.data : p)));
      setModificarProyecto(null);
      setMostrarExitoModificar(true);
      setModoEditar(null);
    } catch (error) {
      console.error('Error al modificar proyecto:', error);
    }
  };

  const manejarActualizarPerfil = (nuevaImagen, nuevoNombre, nuevaDescripcion, nuevaFechaNac) => {
    if (nuevaImagen) setImagenPerfil(nuevaImagen);
    if (nuevoNombre) setNombrePerfil(nuevoNombre);
    if (nuevaDescripcion) setDescripcionPerfil(nuevaDescripcion);
    if (nuevaFechaNac) setNuevafecha(nuevaFechaNac);
    setMostrarExitoPerfil(true);
    setModoEditar(null);
  };

  const agregarProyecto = async (nuevoproy) => {
    const token = localStorage.getItem('token');
    if (!usuarioLogueado?.id || !token) {
      alert('Debes iniciar sesión para agregar un proyecto');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/proyectos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: nuevoproy.nombre,
          descripcion: nuevoproy.descripcion,
          tecnologiasUsadas: nuevoproy.tecnologias,
          creadorId: usuarioLogueado.id,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error HTTP:', res.status, errorText);
        alert('Error al crear el proyecto. La API rechazó la solicitud.');
        return;
      }

      const json = await res.json();
      if (!json.data) {
        throw new Error('Respuesta inválida: no hay datos');
      }

      setProyectosAgregados((prev) => [...(prev || []), json.data]);
      setMostrarExitoAgregar(true);
      setModoEditar(null);
    } catch (error) {
      console.error('Error crítico al agregar proyecto:', error);
      alert('No se pudo crear el proyecto. Revisa tu conexión o intenta más tarde.');
    }
  };

  const handleVerPerfil = (perfil) => {
    console.log("Abriendo perfil:", perfil);
    setPerfilSeleccionado(perfil);
  };

  return (
    <div className={styles.vistaEstirada}>
      <div className={styles.layoutPrincipal}>
        <section className={styles.seccionProyectos}>
          <ContenidoInfoPerfil
            onEditarClick={handleScroll}
            imagen={imagenPerfil}
            nombre={nombrePerfil}
            descripcion={descripcionPerfil}
            FechaNac={FechaNac ? FechaNac.split('T')[0] : ''}
            mail={usuarioLogueado?.mail || 'No registrado'}
          />

          {usuarioLogueado?.rolPostulante && (
            <div className={`${styles.misProyectos} container mt-5`}>
              <div className="text-center mb-4">
                <h3 className={styles.tituloSeccion}>Mis Proyectos</h3>
              </div>

              <div className="row ">
                {proyectosagregados.length === 0 ? (
                  <div className="col-12">
                    <div className={styles.mensajeVacio}>
                      <div className={styles.icono}>📂</div>
                      <p>Aún no has agregado proyectos</p>
                      <p> Haz clic en "Agregar proyecto" para comenzar</p>
                    </div>
                  </div>
                ) : (
                  proyectosagregados.map((proyecto) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={proyecto.id}>
                      <div className={styles.tarjetaProyecto}>
                        <h5 className={styles.tituloProyecto}>{proyecto.nombre}</h5>
                        <p className={styles.descripcionProyecto}>{proyecto.descripcion}</p>
                        <div className={styles.tecnologiasProyecto}>
                          {proyecto.tecnologiasUsadas.split(',').map((tec, i) => (
                            <span key={i} className={styles.tecnologiaChip}>
                              {tec.trim()}
                            </span>
                          ))}
                        </div>
                        <div className={styles.botonesProyecto}>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              setModificarProyecto(proyecto);
                              setModoEditar('proyecto');
                              handleScroll('proyecto');
                            }}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              setProyectoaEliminar(proyecto.id);
                              setMostrarConfirmacion(true);
                            }}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>

        <aside className={styles.asideSugerencias}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h2>Perfiles Recomendados</h2>
            <button
              onClick={refrescarSugeridos}
              disabled={cargandoSugeridos}
              style={{
                background: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: cargandoSugeridos ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: cargandoSugeridos ? 0.6 : 1
              }}
              title="Refrescar sugerencias"
            >
              {cargandoSugeridos ? '⏳' : '🔄'}
            </button>
          </div>

          <div className={styles.buscadorAside}>
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={busquedaPerfil}
              onChange={(e) => setBusquedaPerfil(e.target.value)}
            />
            {buscando && (
              <div style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)' 
              }}>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Buscando...</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.contenedorSugerencias}>
            {cargandoSugeridos && !busquedaPerfil ? (
              <div className={styles.mensajeVacio}>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando perfiles...</p>
              </div>
            ) : perfilesMostrados.length === 0 ? (
              <div className={styles.mensajeVacio}>
                <div className={styles.icono}>👥</div>
                <p>
                  {busquedaPerfil 
                    ? 'No se encontraron usuarios' 
                    : 'No hay perfiles sugeridos'}
                </p>
              </div>
            ) : (
              <>
                {perfilesMostrados.map((p) => {
                  const imagenUrl = p.fotoPerfil 
                    ? `${API_URL.replace(/\/$/, '')}/${p.fotoPerfil.replace(/^\/+/, '')}`
                    : perfilDefault;
                  
                  return (
                    <Sugerencias
                      key={p.id}
                      id={p.id}
                      nombre={p.nombreUsuario}
                      imagen={imagenUrl}
                      descripcion={p.descripcion}
                      rolPostulante={p.rolPostulante}
                      onVerPerfil={() => handleVerPerfil(p)}
                    />
                  );
                })}
                {busquedaPerfil && (
                  <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
                    {perfilesMostrados.length} resultado{perfilesMostrados.length !== 1 ? 's' : ''}
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      </div>

      {modoEditar === 'perfil' && (
        <div ref={editarRef}>
          <Editar
            onCerrar={() => setModoEditar(null)}
            onActualizarPerfil={manejarActualizarPerfil}
            nombre={nombrePerfil}
            descripcion={descripcionPerfil}
            FechaNac={FechaNac}
            imagen={imagenPerfil}
          />
        </div>
      )}

      {modoEditar === 'proyecto' && (
        <div ref={proyectoRef}>
          <Proyecto
            onCerrar={() => {
              setModoEditar(null);
              setModificarProyecto(null);
            }}
            onAgregarProyecto={agregarProyecto}
            onModificarProyecto={async (data) => {
              if (!modificarProyecto) return;
              await modificarProyectoBD(
                modificarProyecto.id,
                data.nombre,
                data.descripcion,
                data.tecnologias
              );
            }}
            nombre={modificarProyecto?.nombre || ''}
            descripcion={modificarProyecto?.descripcion || ''}
            tecnologias={modificarProyecto?.tecnologiasUsadas || ''}
            esEdicion={!!modificarProyecto}
          />
        </div>
      )}

      {modoEditar === 'compartir' && (
        <div ref={compartirRef}>
          <Compartir onCerrar={() => setModoEditar(null)} usuarioId={usuarioLogueado?.id} />
        </div>
      )}

      {mostrarConfirmacion && (
        <>
          <div className={styles.overlay} onClick={() => setMostrarConfirmacion(false)} />
          <div className={styles.confirmModal}>
            <Confirmar
              onCancelar={() => setMostrarConfirmacion(false)}
              onAceptar={() => eliminarProyecto(proyectoaEliminar)}
            />
          </div>
        </>
      )}

      {perfilSeleccionado && (
        <ModalPerfilUsuario
          usuario={perfilSeleccionado}
          proyectos={proyectosPerfilSeleccionado}
          onCerrar={() => setPerfilSeleccionado(null)}
        />
      )}

      {/* Modales de éxito */}
      {mostrarExitoAgregar && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">¡Listo!</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarExitoAgregar(false)}></button>
              </div>
              <div className="modal-body">
                <p>Proyecto agregado con éxito.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setMostrarExitoAgregar(false)}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarExitoModificar && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">¡Listo!</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarExitoModificar(false)}></button>
              </div>
              <div className="modal-body">
                <p>Proyecto modificado con éxito.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setMostrarExitoModificar(false)}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarExitoEliminar && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">¡Listo!</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarExitoEliminar(false)}></button>
              </div>
              <div className="modal-body">
                <p>Proyecto eliminado con éxito.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setMostrarExitoEliminar(false)}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarExitoPerfil && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">¡Perfil actualizado!</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarExitoPerfil(false)}></button>
              </div>
              <div className="modal-body">
                <p>Los cambios en tu perfil se han guardado con éxito.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setMostrarExitoPerfil(false)}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}