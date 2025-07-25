import React, { useState, useEffect, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useLocation } from 'react-router-dom';
import './acordion.css';
import { DatosContexto } from '../datosContext.jsx';
import datosEmpleosIniciales from './datosIniciales';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import { IoIosPaper } from "react-icons/io";
import FormularioPostulacionModal from '../componentes/FormularioPostulacionModal';

function Acordion() {
  const location = useLocation();
  const s = location.state?.mensaje;
  const { busquedaGlobal } = useContext(DatosContexto);
  
  const {usuarioLogueado} = useContext(DatosContexto) //guardo el usuario logueado
  
  const [modalVisible, setModalVisible] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

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
  const [ubicacion, setUbicacion] = useState('');
  const [sueldo, setSueldo] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [horario, setHorario] = useState('');
  const [contacto, setContacto] = useState('');
  const [logo, setLogo] = useState('');
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
        categoria: nuevaCategoria,
        ubicacion,
        sueldo,
        modalidad,
        horario,
        contacto,
        logo
      };
      const actualizados = [...items, nuevo];
      setItems(actualizados);
      localStorage.setItem('empleos', JSON.stringify(actualizados)); // Forzar sincronización
      setNuevoTitulo('');
      setNuevoContenido('');
      setNuevaCategoria('');
      setUbicacion('');
      setSueldo('');
      setModalidad('');
      setHorario('');
      setContacto('');
      setLogo('');
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

   const handlePostular = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setModalVisible(true);
  };

  return (
    <div className="container mt-4">
     
    {usuarioLogueado.rol === "empleador" && ( //si el usuario es empleador le muestra la opcion para agregar una ferta laboral
      <>
        <button
          className="btn-toggle-formulario mb-3"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <i className={`bi ${mostrarFormulario ? 'bi-dash-circle' : 'bi-plus-circle'}`}></i>
          {mostrarFormulario ? 'Cancelar' : 'Agregar Nueva Oferta'}
        </button>

        <div className={`formulario-oferta transition ${mostrarFormulario ? 'mostrar' : 'ocultar'}`}>
          <form onSubmit={manejarSubmit} className="mb-4">
            <input type="text" className="form-control mb-2" placeholder="Título del empleo" value={nuevoTitulo} onChange={(e) => setNuevoTitulo(e.target.value)} />
            <textarea className="form-control mb-2" placeholder="Descripción del empleo" value={nuevoContenido} onChange={(e) => setNuevoContenido(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Categoría del empleo" value={nuevaCategoria} onChange={(e) => setNuevaCategoria(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Ubicación" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Sueldo (o escribí 'A convenir')" value={sueldo} onChange={(e) => setSueldo(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Modalidad (presencial/remoto/híbrido)" value={modalidad} onChange={(e) => setModalidad(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Horario" value={horario} onChange={(e) => setHorario(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="Contacto (email, WhatsApp, etc.)" value={contacto} onChange={(e) => setContacto(e.target.value)} />
            <input type="text" className="form-control mb-2" placeholder="URL de Logo de la empresa (opcional)" value={logo} onChange={(e) => setLogo(e.target.value)} />
            <button type="submit" className="btn btn-bordo w-100">Agregar Oferta</button>
          </form>
        </div>
      </>
    )}

        <Accordion defaultActiveKey={(s ?? 0).toString()}>
        {itemsFiltrados.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={item.id}>
            <Accordion.Header>{item.titulo}</Accordion.Header>
            <Accordion.Body>
              {item.logo && <img src={item.logo} alt="Logo empresa" className="mb-2" style={{ maxHeight: '60px' }} />}
              <p><strong>Categoría:</strong> {item.categoria || 'No especificada'}</p>
              <p><strong>Ubicación:</strong> {item.ubicacion || 'No especificada'}</p>
              <p><strong>Sueldo:</strong> {item.sueldo || 'A convenir'}</p>
              <p><strong>Modalidad:</strong> {item.modalidad || 'No especificada'}</p>
              <p><strong>Horario:</strong> {item.horario || 'No especificado'}</p>
              <p><strong>Contacto:</strong> {item.contacto || 'No especificado'}</p>
              <p className="mt-2">{item.contenido}</p>
              
              {usuarioLogueado.rol!=="postulante" && (
                  <div className="text-end mt-2">
                  <button className="btn btn-sm btn-bordo-danger" onClick={() => confirmarEliminar(item.id)}>
                    <i className="bi bi-trash3-fill me-1"></i> Eliminar
                  </button>
                </div>
              )}
              
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
                        <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
                        <button className="btn btn-bordo-danger" onClick={eliminarConfirmado}>Sí, eliminar</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                <Button 
                variant='dark'
                onClick={()=>handlePostular(item)}>Postularse <IoIosPaper /></Button>
            </Accordion.Body>
          
          </Accordion.Item>
        ))}
      </Accordion>

      <FormularioPostulacionModal
        show={modalVisible}
        handleClose={() => setModalVisible(false)}
        empresa={empresaSeleccionada}
      />
    
    </div>
  );
}

export default Acordion;