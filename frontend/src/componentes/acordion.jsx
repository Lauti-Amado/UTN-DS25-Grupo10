import React, { useState, useEffect, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useLocation } from 'react-router-dom';
import './acordion.css';
import { DatosContexto } from '../datosContext.jsx';
import datosEmpleosIniciales from './datosIniciales';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Acordion() {
  const location = useLocation();
  const s = location.state?.mensaje;
  const { busquedaGlobal } = useContext(DatosContexto);

  const cargarDesdeLocalStorage = () => {
    const datosGuardados = localStorage.getItem('empleos');
    if (datosGuardados) {
      return JSON.parse(datosGuardados);
    } else {
      localStorage.setItem('empleos', JSON.stringify(datosEmpleosIniciales));
      return datosEmpleosIniciales;
    }
  };

  const [items, setItems] = useState(cargarDesdeLocalStorage);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoContenido, setNuevoContenido] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    localStorage.setItem('empleos', JSON.stringify(items));
  }, [items]);

  const itemsFiltrados = items.filter(
    item =>
      item.titulo.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
      item.contenido.toLowerCase().includes(busquedaGlobal.toLowerCase())
  );

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (nuevoTitulo.trim() && nuevoContenido.trim()) {
      const nuevo = {
        id: Date.now(),
        titulo: nuevoTitulo,
        contenido: nuevoContenido,
        categoria: nuevaCategoria
      };
      setItems([...items, nuevo]);
      setNuevoTitulo('');
      setNuevoContenido('');
      setNuevaCategoria('');
      setMostrarFormulario(false);
    }
  };

  const confirmarEliminar = (id) => {
    setIdAEliminar(id);
    setMostrarModal(true);
  };

  const eliminarConfirmado = () => {
    const nuevas = items.filter((item) => item.id !== idAEliminar);
    setItems(nuevas);
    setMostrarModal(false);
  };

  return (
    <div className="container mt-4">
      <button
        className="btn-toggle-formulario mb-3"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        <i className={`bi ${mostrarFormulario ? 'bi-dash-circle' : 'bi-plus-circle'}`}></i>
        {mostrarFormulario ? 'Cancelar' : 'Agregar Nueva Oferta'}
      </button>

      <div
        className={`formulario-oferta transition ${
          mostrarFormulario ? 'mostrar' : 'ocultar'
        }`}
      >
        <form onSubmit={manejarSubmit} className="mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Título del empleo"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Descripción del empleo"
            value={nuevoContenido}
            onChange={(e) => setNuevoContenido(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Categoría del empleo"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
          />
          <button type="submit" className="btn btn-bordo w-100">
            Agregar Oferta
          </button>
        </form>
      </div>

      <Accordion defaultActiveKey={(s ?? 0).toString()}>
        {itemsFiltrados.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={item.id}>
            <Accordion.Header>{item.titulo}</Accordion.Header>
            <Accordion.Body>
              <strong>Categoría:</strong> {item.categoria || 'No especificada'}
              <br />
              <p className="mt-2">{item.contenido}</p>
              <div className="text-end mt-2">
              <button
                className="btn btn-sm btn-bordo-danger"
                onClick={() => confirmarEliminar(item.id)}
              >
                <i className="bi bi-trash3-fill me-1"></i> Eliminar
              </button>
              </div>
              {mostrarModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">Confirmar eliminación</h5>
                        <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
                      </div>
                      <div className="modal-body">
                        <p>¿Estás seguro que querés eliminar esta oferta?</p>
                      </div>
                      <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                          Cancelar
                        </button>
                        <button className="btn btn-bordo-danger" onClick={eliminarConfirmado}>
                          Sí, eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default Acordion;