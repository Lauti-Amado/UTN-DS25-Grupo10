import React, { use, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContenidoInfoPerfil from '../componentes/ContenidoInfoPerfil';
import PerfilesSugeridos from '../componentes/sugerenciasperfiles';
import Editar from '../componentes/editar';
import Proyecto from '../componentes/proyecto';
import '../componentes/ofertaCard.css';
import imagen from '../assets/perfilx.png';
import Compartir from '../componentes/compartir';
import Confirmar from '../componentes/confirmar'
import styles from '../paginas/perfil.module.css';
import { DatosContexto } from '../datosContext';
import { useContext, useEffect } from 'react';
import { API_URL } from '../config';

export default function Perfil() {
 
  const [modoEditar, setModoEditar] = useState(null);
  const [proyectoaEliminar, setProyectoaEliminar] = useState(null)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [modificarProyecto, setModificarProyecto] = useState(null)
  const [imagenPerfil, setImagenPerfil] = useState(imagen);
  const [nombrePerfil, setNombrePerfil] = useState('Nombre Perfil');
  const [descripcionPerfil, setDescripcionPerfil] = useState(
    'Soy un estudiante de sistemas con ganas de insertarme en el mundo laboral. Poseo los conocimientos de algunas tecnologías, idiomas y trabajo en equipo.'
  );
  const [FechaNac, setNuevafecha] = useState('');
  const [proyectosagregados, setProyectosAgregados] = useState([]);
  const { usuarioLogueado } = useContext(DatosContexto);

  //este useEffect TRAER los Proyectos desde el backend (SOLO POSTULANTES)
  useEffect(() => {
    const fetchProyectos = async () => {
      // Solo si es postulante
      if (!usuarioLogueado || !usuarioLogueado.rolPostulante) return; 

      try {
        const res = await fetch(`${API_URL}/proyectos/postulado/${usuarioLogueado.id}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();

        setProyectosAgregados(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error("Error al traer proyectos:", err);
        setProyectosAgregados([]);
      }
    };

    fetchProyectos();
  }, [usuarioLogueado]);

  //Funcion para ELIMINAR PROYECTO
  const eliminarProyecto = async (id) => {
    try {
      const res = await fetch(`${API_URL}/proyectos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error("Error al eliminar proyecto");

      //sacar el estado
      setProyectosAgregados(prev => prev.filter(p => p.id !== id ));
      setMostrarConfirmacion(false);
      setProyectoaEliminar(null); 
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  };

  //funcion para MODIFICAR PROYECTO
  const modificarProyectoBD = async (id,nuevoNombre,nuevaDescripcion,nuevasTecnologias) => {
    try {
      const res = await fetch(`${API_URL}/proyectos/${id}`, {
        method: 'PUT',
        headers: { "Content-Type":"application/json"},
        body:JSON.stringify({
          nombre: nuevoNombre,
          descripcion: nuevaDescripcion,
          tecnologiasUsadas: nuevasTecnologias,
        }),
      });
      if (!res.ok) throw new Error("Error al modificar proyecto");
      const json = await res.json();

      //actualizar estado local con lo que devuelve el backend
      setProyectosAgregados (prev =>
        prev.map (p => (p.id === id ? json.data:p))
      );

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
  
  const manejarActualizarProyecto = (nombreProyecto, descripcionProyecto, tecnologias) => {
    console.log('Proyecto agregado o actualizado:', nombreProyecto, descripcionProyecto, tecnologias);
    setModoEditar(null);
  };

  const agregarProyecto = async (nuevoproy) => {
    try {
      const res = await fetch(`${API_URL}/proyectos`, {
        method: 'POST',
        headers: { "Content-Type":"application/json"},
        body:JSON.stringify({
          nombre: nuevoproy.nombre,
          descripcion: nuevoproy.descripcion,
          tecnologiasUsadas: nuevoproy.tecnologias,
          creadorId:usuarioLogueado.id
        }),
      });
      if (!res.ok) throw new Error("Error al crear proyecto");
      const json = await res.json();

      //actualizar estado con lo que devuelve el backend (incluye id autogenerado)
      setProyectosAgregados(prev => [...(prev || []), json.data]);
      setModoEditar(null);
    } catch (error) {
      console.error('Error al agregar proyecto:', error);
    }
  };

  const SolicitarEliminar=(id)=>{
    setProyectoaEliminar(id);
    setMostrarConfirmacion(true)
  };

  const CuadroConfirmacion=()=>{
    eliminarProyecto(proyectoaEliminar);
  };
  
  const Cancelar=()=>{
    setMostrarConfirmacion(false)
    setProyectoaEliminar(null)
  }
  
  const AbrirModificarProyecto = (id) => {
    const proyecto = proyectosagregados.find(p => p.id === id);
    if (proyecto) {
      setModificarProyecto(proyecto);         
      setModoEditar('modificarProyecto');     
    }
  };

  // Actualizar el nombre del perfil cuando cambia el usuario logueado
  useEffect(() => {
    if (usuarioLogueado) {
      setNombrePerfil(usuarioLogueado.nombreUsuario);
      setDescripcionPerfil(usuarioLogueado.descripcion || '');

      const fechaISO = usuarioLogueado.fechaNacimiento
        ? new Date(usuarioLogueado.fechaNacimiento).toISOString().split('T')[0]
        : '';
      setNuevafecha(fechaISO);

      // Si hay fotoPerfil, construir la URL completa
      if (usuarioLogueado.fotoPerfil) {
        setImagenPerfil(`${API_URL}/${usuarioLogueado.fotoPerfil}`);
      } else {
        setImagenPerfil(imagen); // la imagen por defecto
      }
    }
  }, [usuarioLogueado]);

  return (
    <div className="vistaEstirada" style={{ position: 'relative' }}>
      <div className={styles.article}>
        <ContenidoInfoPerfil
          onEditarClick={(tipo) => setModoEditar(tipo)} 
          imagen={imagenPerfil}
          nombre={nombrePerfil}
          descripcion={descripcionPerfil}
          FechaNac={FechaNac}
        />
        <PerfilesSugeridos />
      </div>

      {modoEditar && (
        <>
          <div
            onClick={() => setModoEditar(null)}
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
              top: '58%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              maxWidth: '80%',
              maxHeight: '80%',
              overflowY: 'auto',
            }}
          > 
            {modoEditar === 'perfil' && (
              <Editar
                onCerrar={() => setModoEditar(null)}
                onActualizarPerfil={manejarActualizarPerfil}
                nombre={nombrePerfil}
                descripcion={descripcionPerfil}
                FechaNac={FechaNac}
                imagen={imagenPerfil}
              />
            )}
           
            {modoEditar === 'proyecto' && (
              <Proyecto
                onCerrar={() => setModoEditar(null)}
                onAgregarProyecto={agregarProyecto}
                onActualizarPerfil={manejarActualizarProyecto}
              />
            )}
            {modoEditar === 'compartir' && (
              <Compartir
                onCerrar={()=> setModoEditar(null)}
                usuarioId={usuarioLogueado?.id}
              />
            )}

            {modoEditar === 'modificarProyecto' && modificarProyecto && 
              ( <Proyecto 
                  nombre={modificarProyecto.nombre} 
                  descripcion={modificarProyecto.descripcion} 
                  tecnologias={modificarProyecto.tecnologias} 
                  onCerrar={() => { 
                    setModoEditar(null); 
                    setModificarProyecto(null);
                  }} 
                  onModificarProyecto= {(nuevoNombre, nuevaDescripcion, nuevasTecnologias) => {
                    modificarProyectoBD (
                      modificarProyecto.id, 
                      nuevoNombre, 
                      nuevaDescripcion,
                      nuevasTecnologias
                    );
                  }}
                />
            )}
          </div>
        </>
      )}
        
      {mostrarConfirmacion && (
        <>
          <div
            onClick={Cancelar}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              zIndex: 1100, 
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1101,
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              maxWidth: '90%',
              maxHeight: '90%',
              overflowY: 'auto',
            }}
          >
            <Confirmar
              onCancelar={Cancelar}
              onAceptar={CuadroConfirmacion}
            />
          </div>
        </>
      )}

      {/* Solo mostrar proyectos si es postulante */}
      {usuarioLogueado?.rolPostulante && (
        <div className="container mt-4">
          <h3 className="mb-3">Mis Proyectos</h3>
          <div className="row">
            {proyectosagregados.length === 0 ? (
              <p>No tienes proyectos creados aún.</p>
            ) : (
              proyectosagregados.map((proyecto) => (
                <div className="col-md-4 mb-3" key={proyecto.id}>
                  <div 
                    className="card h-100" 
                    style={{
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fs-2">{proyecto.nombre}</h5>
                      <p className="card-text">{proyecto.descripcion}</p>
                      
                      {/* Tecnologías */}
                      <div className="mt-2">
                        <p className={styles.tecnologias}> Tecnologías: </p>
                        <div className="mt-1 d-flex flex-wrap gap-2">
                          {proyecto.tecnologiasUsadas.split(",").map((tec, i) => (
                            <span
                              key={i}
                              className="badge"
                              style={{
                                backgroundColor: ["#FF4500", "#D32F2F", "#212121", "#9E9E9E", "#F5F5F5"][i % 5],
                                color: i % 5 === 4 ? "#000" : "#fff",
                                padding: "6px 10px",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                              }}
                            >
                              {tec.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto pt-3">
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => AbrirModificarProyecto(proyecto.id)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => SolicitarEliminar(proyecto.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}