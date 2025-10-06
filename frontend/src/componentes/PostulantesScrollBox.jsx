import React, { useState, useRef, useEffect } from 'react';
import './PostulantesScrollBox.css';

const PostulantesScrollBox = ({ empleadorId }) => {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [orden, setOrden] = useState('');
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [postulanteSeleccionado, setPostulanteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [postulantes, setPostulantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const opcionesRef = useRef();

  // 🔹 1. Obtener todos los postulantes de las ofertas del empleador
  useEffect(() => {
    console.log('🔍 EmpleadorId recibido:', empleadorId);
    if (!empleadorId) {
      console.log('⚠️ No hay empleadorId, saliendo...');
      return;
    }

    const obtenerPostulantes = async () => {
      setCargando(true);
      try {
        // Paso 1: Obtener todas las ofertas del empleador
        console.log('📡 Fetching ofertas del empleador...');
        const resOfertas = await fetch(`http://localhost:3000/ofertas/empleador/${empleadorId}`);
        const dataOfertas = await resOfertas.json();
        console.log('📦 Ofertas recibidas:', dataOfertas);

        if (!dataOfertas.success || !dataOfertas.data || dataOfertas.data.length === 0) {
          console.log('⚠️ No hay ofertas para este empleador');
          setPostulantes([]);
          setCargando(false);
          return;
        }

        console.log(`✅ ${dataOfertas.data.length} ofertas encontradas`);

        // Paso 2: Para cada oferta, obtener sus formularios (postulantes)
        const promesasFormularios = dataOfertas.data.map(oferta => {
          console.log(`📡 Fetching formularios para oferta ${oferta.id}...`);
          return fetch(`http://localhost:3000/ofertas/${oferta.id}/formularios`)
            .then(res => res.json())
            .then(data => {
              console.log(`📦 Formularios de oferta ${oferta.id}:`, data);
              return {
                ...data,
                categoria: oferta.categoria // Agregamos la categoría de la oferta
              };
            });
        });

        const resultados = await Promise.all(promesasFormularios);
        console.log('📦 Todos los resultados:', resultados);

        // Paso 3: Unificar todos los postulantes y agregar la categoría
        const todosLosPostulantes = resultados.flatMap(resultado => {
          if (resultado.success && resultado.data) {
            return resultado.data.map(formulario => ({
              ...formulario,
              categoria: resultado.categoria // Categoría de la oferta a la que postuló
            }));
          }
          return [];
        });

        console.log('✅ Total postulantes procesados:', todosLosPostulantes.length);
        console.log('👥 Postulantes:', todosLosPostulantes);
        setPostulantes(todosLosPostulantes);
      } catch (error) {
        console.error('❌ Error al obtener postulantes:', error);
        setPostulantes([]);
      } finally {
        setCargando(false);
      }
    };

    obtenerPostulantes();
  }, [empleadorId]);

  // 🔹 2. Generar categorías únicas
  const categoriasUnicas = [...new Set(postulantes.map(p => p.categoria).filter(Boolean))];

  // 🔹 3. Filtrar postulantes
  let postulantesFiltrados = postulantes.filter(p =>
    `${p.nombre} ${p.apellido} ${p.descripcion}`.toLowerCase().includes(filtroTexto.toLowerCase()) &&
    (filtroCategoria === '' || p.categoria === filtroCategoria)
  );

  // 🔹 4. Ordenar
  postulantesFiltrados.sort((a, b) => {
    switch (orden) {
      case 'nombreAsc': return a.nombre.localeCompare(b.nombre);
      case 'nombreDesc': return b.nombre.localeCompare(a.nombre);
      default: return 0;
    }
  });

  const limpiarFiltros = () => {
    setFiltroTexto('');
    setFiltroCategoria('');
    setOrden('');
  };

  const handleClickOutside = (e) => {
    if (opcionesRef.current && !opcionesRef.current.contains(e.target)) {
      setMostrarOpciones(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 5. Renderizado
  return (
    <div className="container-fluid p-4 bg-black text-white postulantes-contenedor">
      <h4 className="mb-4 text-center">Postulantes a tus ofertas</h4>

      {cargando ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Filtros */}
          <div className="row justify-content-center align-items-start mb-3 gy-3 gx-2">
            <div className="col-12 col-md-auto" ref={opcionesRef}>
              <div className="mb-3">
                <button
                  className="btn btn-danger w-100 d-flex justify-content-center align-items-center"
                  onClick={() => setMostrarOpciones(!mostrarOpciones)}
                >
                  <i className="bi bi-funnel-fill me-2"></i> Filtros
                </button>

                {mostrarOpciones && (
                  <div className="bg-dark border border-secondary rounded p-3 mt-2 shadow-sm animate__animated animate__fadeIn">
                    {/* Filtrar por categoría */}
                    <label className="text-white mb-2">Filtrar por Categoría:</label>
                    <select
                      className="form-select bg-dark text-white border-secondary mb-2"
                      value={filtroCategoria}
                      onChange={(e) => setFiltroCategoria(e.target.value)}
                    >
                      <option value="">Todas</option>
                      {categoriasUnicas.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>

                    {/* Orden */}
                    <label className="text-white mb-1">Ordenar por:</label>
                    <select
                      className="form-select bg-dark text-white border-secondary mb-3"
                      value={orden}
                      onChange={(e) => setOrden(e.target.value)}
                    >
                      <option value="">-- Sin orden --</option>
                      <option value="nombreAsc">Nombre A–Z</option>
                      <option value="nombreDesc">Nombre Z–A</option>
                    </select>

                    <button className="btn btn-outline-danger btn-sm w-100" onClick={limpiarFiltros}>
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="col">
              <input
                type="text"
                placeholder="Buscar por nombre o descripción..."
                className="form-control bg-dark text-white border border-secondary"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />
            </div>
          </div>

          {/* Listado de postulantes */}
          <div className="row justify-content-center mt-4">
            {postulantesFiltrados.length > 0 ? (
              postulantesFiltrados.map((p, i) => (
                <div className="col-12 col-sm-6 col-lg-4 mb-4" key={i}>
                  <div 
                    className="card bg-dark text-white border-secondary h-100 shadow-sm hover-card"
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => {
                      setPostulanteSeleccionado(p);
                      setMostrarModal(true);
                    }}
                  >
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center" 
                             style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}>
                          <i className="bi bi-person-fill"></i>
                        </div>
                        <div className="ms-3">
                          <h5 className="card-title mb-1">{p.nombre} {p.apellido}</h5>
                          <span className="badge bg-danger">{p.categoria || 'Sin categoría'}</span>
                        </div>
                      </div>
                      
                      <p className="card-text mb-2">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        {p.localidad}, {p.pais}
                      </p>
                      
                      <p className="card-text flex-grow-1" style={{ fontSize: '0.9rem' }}>
                        {p.descripcion?.substring(0, 100)}
                        {p.descripcion?.length > 100 ? '...' : ''}
                      </p>
                      
                      <div className="mt-auto">
                        <button className="btn btn-outline-danger btn-sm w-100">
                          <i className="bi bi-eye-fill me-2"></i>
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-4">
                {postulantes.length === 0 
                  ? 'Aún no hay postulantes en tus ofertas.' 
                  : 'No se encontraron postulantes con esos filtros.'}
              </p>
            )}
          </div>
        </>
      )}

      {mostrarModal && postulanteSeleccionado && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">
                  <i className="bi bi-person-badge me-2"></i>
                  Información del Postulante
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setMostrarModal(false)}
                ></button>
              </div>
              
              <div className="modal-body">
                <div>
                  <div>
                    <label className="small">NOMBRE Y APELLIDO</label>
                    <p>{postulanteSeleccionado.nombre} {postulanteSeleccionado.apellido}</p>

                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className=" small">GÉNERO</label>
                    <p>{postulanteSeleccionado.genero || 'No especificado'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="small">CATEGORÍA</label>
                    <p>
                      <span className="badge bg-danger fs-6">
                        {postulanteSeleccionado.categoria || 'Sin categoría'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className=" small">LOCALIDAD</label>
                    <p>
                      <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                      {postulanteSeleccionado.localidad}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="text small">PAÍS</label>
                    <p>
                      <i className="bi bi-flag-fill text-danger me-2"></i>
                      {postulanteSeleccionado.pais}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-muted small">DESCRIPCIÓN</label>
                  <p className="p-3 bg-black rounded border border-secondary">
                    {postulanteSeleccionado.descripcion || 'Sin descripción'}
                  </p>
                </div>

                {postulanteSeleccionado.curriculum && (
                  <div className="mb-3">
                    <label className="text-muted small">CURRÍCULUM</label>
                    <div className="d-flex gap-2">
                      <a
                        href={`http://localhost:3000/uploads/${postulanteSeleccionado.curriculum}`}
                        download
                        className="btn btn-danger flex-grow-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-download me-2"></i>
                        Descargar Currículum
                      </a>
                      <a
                        href={`http://localhost:3000/uploads/${postulanteSeleccionado.curriculum}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-danger"
                      >
                        <i className="bi bi-eye-fill"></i>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer border-secondary">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setMostrarModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostulantesScrollBox;