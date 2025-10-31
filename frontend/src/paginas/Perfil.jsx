import React, { useRef, useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContenidoInfoPerfil from '../componentes/ContenidoInfoPerfil';
import Editar from '../componentes/editar';
import Proyecto from '../componentes/proyecto';
import imagen from '../assets/perfilx.png';
import Compartir from '../componentes/compartir';
import Confirmar from '../componentes/confirmar';
import TarjetaSugerida from '../componentes/TarjetaSugerida';
import styles from '../paginas/perfil.module.css';
import { DatosContexto } from '../datosContext';
import { API_URL } from '../config';

export default function Perfil() {
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
  const { usuarioLogueado } = useContext(DatosContexto);

  const editarRef = useRef(null);
  const compartirRef = useRef(null);
  const proyectoRef = useRef(null);

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

  const eliminarProyecto = async (id) => {
    try {
      await fetch(`${API_URL}/proyectos/${id}`, { method: 'DELETE' });
      setProyectosAgregados((prev) => prev.filter((p) => p.id !== id));
      setMostrarConfirmacion(false);
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
    try {
      const res = await fetch(`${API_URL}/proyectos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nuevoproy.nombre,
          descripcion: nuevoproy.descripcion,
          tecnologiasUsadas: nuevoproy.tecnologias,
          creadorId: usuarioLogueado.id,
        }),
      });
      const json = await res.json();
      setProyectosAgregados((prev) => [...(prev || []), json.data]);
      setModoEditar(null);
    } catch (error) {
      console.error('Error al agregar proyecto:', error);
    }
  };

  const [perfiles, setPerfiles] = useState([]);
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
              <h3 className={styles.tituloSeccion}>Mis Proyectos</h3>
              <div className="row mt-4">
                {proyectosagregados.length === 0 ? (
                  <p className="text-muted">Aún no has agregado proyectos.</p>
                ) : (
                  proyectosagregados.map((proyecto) => (
                    <div className="col-md-4 mb-4" key={proyecto.id}>
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
                            className="btn btn-sm btn-outline-light"
                            onClick={() => modificarProyectoBD(proyecto.id)}
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
          {perfiles.map((p) => (
            <TarjetaSugerida key={p.id} {...p} />
          ))}
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
          <Proyecto onCerrar={() => setModoEditar(null)} onAgregarProyecto={agregarProyecto} />
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
    </div>
  );
}
