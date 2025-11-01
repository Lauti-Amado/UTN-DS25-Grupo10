import React, { useRef, useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContenidoInfoPerfil from '../componentes/ContenidoInfoPerfil';
import Editar from '../componentes/editar';
import Proyecto from '../componentes/proyecto';
import imagen from '../assets/perfilx.png';
import Compartir from '../componentes/compartir';
import Confirmar from '../componentes/confirmar';
import TarjetaSugerida from '../componentes/TarjetaSugerida';
import ModalPerfilUsuario from '../componentes/ModalPerfilUsuario';
import styles from '../paginas/perfil.module.css';
import { DatosContexto } from '../datosContext';
import { API_URL } from '../config';

export default function Perfil() {
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
  const [perfiles, setPerfiles] = useState([]); // PRIMERO declarar perfiles
  const [busquedaPerfil, setBusquedaPerfil] = useState('');
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  
  const { usuarioLogueado } = useContext(DatosContexto);

  const editarRef = useRef(null);
  const compartirRef = useRef(null);
  const proyectoRef = useRef(null);

  // DESPUÉS calcular perfilesFiltrados
  const perfilesFiltrados = perfiles.filter(p => 
    p.nombreUsuario?.toLowerCase().includes(busquedaPerfil.toLowerCase())
  );

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

  useEffect(() => {
    const fetchPerfiles = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/usuarios/sugeridos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) setPerfiles(json.data);
      } catch (error) {
        console.error('Error al obtener perfiles sugeridos:', error);
      }
    };
    fetchPerfiles();
  }, []);

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
        'Authorization': `Bearer ${token}`,
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

    setProyectosAgregados(prev => [...(prev || []), json.data]);
    setMostrarExitoAgregar(true); 
    setModoEditar(null);
  } catch (error) {
    console.error('Error crítico al agregar proyecto:', error);
    alert('No se pudo crear el proyecto. Revisa tu conexión o intenta más tarde.');
  }
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
            FechaNac={FechaNac}
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
          <h2>Perfiles Recomendados</h2>
          
          <div className={styles.buscadorAside}>
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={busquedaPerfil}
              onChange={(e) => setBusquedaPerfil(e.target.value)}
            />
          </div>

          <div className={styles.contenedorSugerencias}>
            {perfilesFiltrados.length === 0 ? (
              <div className={styles.mensajeVacio}>
                <div className={styles.icono}>👥</div>
                <p>{busquedaPerfil ? 'No se encontraron usuarios' : 'No hay perfiles sugeridos'}</p>
              </div>
            ) : (
              perfilesFiltrados.map((p) => (
                <TarjetaSugerida 
                  key={p.id} 
                  {...p} 
                  onVerPerfil={() => setPerfilSeleccionado(p)}
                />
              ))
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
  onAgregarProyecto={agregarProyecto} // siempre se pasa
  onModificarProyecto={async (data) => {
    if (!modificarProyecto) return; // evita null
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
  esEdicion={!!modificarProyecto} // <-- esto es clave
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
          onCerrar={() => setPerfilSeleccionado(null)}
        />
      )}

     {/* Modal éxito agregar */}
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

{/* Modal éxito modificar */}
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

{/* Modal éxito eliminar */}
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

    </div>
  );
}