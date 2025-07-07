// componentes/PostulantesScrollBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import TrabajoCard from './TrabajoCard';
import './PostulantesScrollBox.css';
import datosPostulantes from './datosPostulantes';
import ModalDatosPostulante from './ModalDatosPostulante';

const postulantesOriginales = [
  {
    nombre: "Lucía Martínez",
    rol: "Desarrolladora Frontend",
    sueldo: "$350.000",
    imagen: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    nombre: "Carlos Gómez",
    rol: "Diseñador UI/UX",
    sueldo: "$310.000",
    imagen: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    nombre: "Valentina Ruiz",
    rol: "QA Tester",
    sueldo: "$280.000",
    imagen: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    nombre: "Martín Pereyra",
    rol: "Desarrollador Backend",
    sueldo: "$400.000",
    imagen: "https://randomuser.me/api/portraits/men/51.jpg"
  },
  {
    nombre: "Camila Fernández",
    rol: "Científica de Datos",
    sueldo: "$450.000",
    imagen: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    nombre: "Santiago López",
    rol: "DevOps Engineer",
    sueldo: "$500.000",
    imagen: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    nombre: "Julieta Castro",
    rol: "Full Stack Developer",
    sueldo: "$550.000",
    imagen: "https://randomuser.me/api/portraits/women/12.jpg"
  }
];

const PostulantesScrollBox = () => {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [orden, setOrden] = useState('');
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [postulanteSeleccionado, setPostulanteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const opcionesRef = useRef();

  const rolesUnicos = [...new Set(postulantesOriginales.map(p => p.rol))];

  const handleClickOutside = (e) => {
    if (opcionesRef.current && !opcionesRef.current.contains(e.target)) {
      setMostrarOpciones(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const limpiarFiltros = () => {
    setFiltroTexto('');
    setFiltroRol('');
    setOrden('');
  };

  let postulantesFiltrados = postulantesOriginales.filter(p =>
    `${p.nombre} ${p.rol} ${p.sueldo}`.toLowerCase().includes(filtroTexto.toLowerCase()) &&
    (filtroRol === '' || p.rol === filtroRol)
  );

  postulantesFiltrados.sort((a, b) => {
    const getSueldo = (s) => parseInt(s.replace(/\D/g, ''));
    switch (orden) {
      case 'sueldoAsc': return getSueldo(a.sueldo) - getSueldo(b.sueldo);
      case 'sueldoDesc': return getSueldo(b.sueldo) - getSueldo(a.sueldo);
      case 'nombreAsc': return a.nombre.localeCompare(b.nombre);
      case 'nombreDesc': return b.nombre.localeCompare(a.nombre);
      case 'rolAsc': return a.rol.localeCompare(b.rol);
      case 'rolDesc': return b.rol.localeCompare(a.rol);
      default: return 0;
    }
  });

  return (
    <div className="container-fluid p-4 bg-black text-white postulantes-contenedor">
      <h4 className="mb-4 text-center">Perfiles de postulantes</h4>

      <div className="row justify-content-center align-items-start mb-3 gy-3 gx-2">
        <div className="col-12 col-md-auto" ref={opcionesRef}>
          <div className="mb-3">
            <button
              className={`btn w-100 d-flex justify-content-center align-items-center btn-danger`}
              onClick={() => setMostrarOpciones(!mostrarOpciones)}
            >
              <i className="bi bi-funnel-fill me-2"></i> Filtros
            </button>

            {mostrarOpciones && (
              <div className="bg-dark border border-secondary rounded p-3 mt-2 shadow-sm animate__animated animate__fadeIn opciones-filtro">
                {renderFiltros()}
              </div>
            )}
          </div>
        </div>

        <div className="col">
          <input
            type="text"
            placeholder="Buscar por nombre, rol o sueldo..."
            className="form-control bg-dark text-white border border-secondary"
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        {postulantesFiltrados.length > 0 ? (
          postulantesFiltrados.map((p, i) => {
            const nombreBase = p.nombre.split(" ")[0];
            const datosExtendidos = datosPostulantes.find(dp => p.nombre.includes(dp.nombre));

            return (
              <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center mb-3" key={i}>
                <TrabajoCard
                  EsTrabajo={false}
                  titulo={p.nombre}
                  rol={p.rol}
                  imagen={p.imagen}
                  postulante={{ ...p, ...(datosExtendidos || {}) }}
                  onVerDatos={() => {
                    setPostulanteSeleccionado({ ...p, ...(datosExtendidos || {}) });
                    setMostrarModal(true);
                  }}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center mt-4">No se encontraron coincidencias.</p>
        )}
      </div>

      {mostrarModal && postulanteSeleccionado && (
        <ModalDatosPostulante
          postulante={postulanteSeleccionado}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );

  function renderFiltros() {
    return (
      <>
        <label className="text-white mb-2">Filtrar por Rol:</label>
        <select
          className="form-select bg-dark text-white border-secondary mb-2"
          value={filtroRol}
          onChange={(e) => setFiltroRol(e.target.value)}
        >
          <option value="">Todos</option>
          {rolesUnicos.map((rol, i) => (
            <option key={i} value={rol}>{rol}</option>
          ))}
        </select>

        <label className="text-white mb-1">Ordenar por:</label>
        <select
          className="form-select bg-dark text-white border-secondary mb-3"
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="">-- Sin orden --</option>
          <option value="sueldoAsc">Sueldo Ascendente</option>
          <option value="sueldoDesc">Sueldo Descendente</option>
          <option value="nombreAsc">Nombre A–Z</option>
          <option value="nombreDesc">Nombre Z–A</option>
          <option value="rolAsc">Rol A–Z</option>
          <option value="rolDesc">Rol Z–A</option>
        </select>

        <button className="btn btn-outline-danger btn-sm w-100" onClick={limpiarFiltros}>
          Limpiar filtros
        </button>
      </>
    );
  }
};

export default PostulantesScrollBox;