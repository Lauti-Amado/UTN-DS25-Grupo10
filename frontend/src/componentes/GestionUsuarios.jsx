import React, { useContext, useEffect, useState } from "react";
import { DatosContexto } from "../datosContext";
import { API_URL } from '../config';
import { FaEdit, FaTrash, FaUserCheck, FaUserSlash, FaSearch } from "react-icons/fa";
import './GestionUsuarios.css';

export default function GestionUsuarios() {
  const { usuarioLogueado } = useContext(DatosContexto);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  
  // Estados para modal de edición
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    mail: "",
    nombreUsuario: "",
    descripcion: "",
    fechaNacimiento: "",
    rolPostulante: true,
    esAdmin: false
  });

  // Estado para modal de confirmación
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [accionConfirmar, setAccionConfirmar] = useState(null);

  useEffect(() => {
    if (usuarioLogueado?.esAdmin) {
      fetchUsuarios();
    }
  }, [usuarioLogueado]);

  const fetchUsuarios = async () => {
    setCargando(true);
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setUsuarios(data.data || data || []);
      } else {
        console.error("Error en la respuesta:", data);
        setUsuarios([]);
      }
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setUsuarios([]);
    } finally {
      setCargando(false);
    }
  };

  const abrirModalEdicion = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nombre: usuario.nombre || "",
      mail: usuario.mail || "",
      nombreUsuario: usuario.nombreUsuario || "",
      descripcion: usuario.descripcion || "",
      fechaNacimiento: usuario.fechaNacimiento 
        ? new Date(usuario.fechaNacimiento).toISOString().split('T')[0] 
        : "",
      rolPostulante: usuario.rolPostulante,
      esAdmin: usuario.esAdmin || false
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const guardarCambios = async () => {
    const token = localStorage.getItem("token");
    try {
      const dataToSend = {
        ...formData,
        fechaNacimiento: formData.fechaNacimiento || null
      };

      const res = await fetch(`${API_URL}/usuarios/${usuarioEditando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (res.ok) {
        await fetchUsuarios();
        setShowModal(false);
        alert("Usuario actualizado exitosamente");
      } else {
        const error = await res.json();
        alert(`Error: ${error.message || "No se pudo actualizar el usuario"}`);
      }
    } catch (err) {
      console.error("Error actualizando usuario:", err);
      alert("Error al actualizar el usuario");
    }
  };

  const toggleEstadoUsuario = async (usuario) => {
    const token = localStorage.getItem("token");
    const nuevoEstado = !usuario.activo;
    
    try {
      const res = await fetch(`${API_URL}/usuarios/${usuario.id}/toggle-activo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ activo: nuevoEstado })
      });

      if (res.ok) {
        await fetchUsuarios();
        setShowConfirmModal(false);
        alert(`Usuario ${nuevoEstado ? 'activado' : 'desactivado'} exitosamente`);
      }
    } catch (err) {
      console.error("Error cambiando estado:", err);
      alert("Error al cambiar el estado del usuario");
    }
  };

  const eliminarUsuario = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        await fetchUsuarios();
        setShowConfirmModal(false);
        alert("Usuario eliminado exitosamente");
      }
    } catch (err) {
      console.error("Error eliminando usuario:", err);
      alert("Error al eliminar el usuario");
    }
  };

  const confirmarAccion = (accion, usuario) => {
    setAccionConfirmar({ tipo: accion, usuario });
    setShowConfirmModal(true);
  };

  const ejecutarAccion = () => {
    if (!accionConfirmar) return;
    
    const { tipo, usuario } = accionConfirmar;
    
    if (tipo === "eliminar") {
      eliminarUsuario(usuario.id);
    } else if (tipo === "toggle") {
      toggleEstadoUsuario(usuario);
    }
  };

  const usuariosFiltrados = usuarios.filter(usuario => {
    const matchBusqueda = (
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.mail.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.nombreUsuario.toLowerCase().includes(busqueda.toLowerCase())
    );

    const matchRol = filtroRol === "todos" || 
      (filtroRol === "admin" && usuario.esAdmin) ||
      (filtroRol === "postulante" && usuario.rolPostulante && !usuario.esAdmin) ||
      (filtroRol === "empleador" && !usuario.rolPostulante && !usuario.esAdmin);

    const matchEstado = filtroEstado === "todos" ||
      (filtroEstado === "activos" && usuario.activo) ||
      (filtroEstado === "inactivos" && !usuario.activo);

    return matchBusqueda && matchRol && matchEstado;
  });

  if (!usuarioLogueado?.esAdmin) {
    return (
      <div className="alert alert-danger">
        No tienes permisos para acceder a esta sección.
      </div>
    );
  }

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="gestion-usuarios-container">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">
            <i className="bi bi-people-fill me-2"></i>
            Gestión de Usuarios
          </h3>
        </div>

        <div className="card-body">
          {/* Filtros y búsqueda */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre, email o usuario..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <select 
                className="form-select"
                value={filtroRol} 
                onChange={(e) => setFiltroRol(e.target.value)}
              >
                <option value="todos">Todos los roles</option>
                <option value="admin">Administradores</option>
                <option value="postulante">Postulantes</option>
                <option value="empleador">Empleadores</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <select 
                className="form-select"
                value={filtroEstado} 
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="activos">Activos</option>
                <option value="inactivos">Inactivos</option>
              </select>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="row mb-4">
            <div className="col">
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge bg-primary p-2">
                  Total: {usuarios.length}
                </span>
                <span className="badge bg-success p-2">
                  Activos: {usuarios.filter(u => u.activo).length}
                </span>
                <span className="badge bg-danger p-2">
                  Inactivos: {usuarios.filter(u => !u.activo).length}
                </span>
                <span className="badge bg-warning text-dark p-2">
                  Admins: {usuarios.filter(u => u.esAdmin).length}
                </span>
              </div>
            </div>
          </div>

          {/* Lista de usuarios */}
          {usuariosFiltrados.length === 0 ? (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              No se encontraron usuarios con los filtros seleccionados.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover usuarios-table">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map(usuario => (
                    <tr key={usuario.id} className={!usuario.activo ? 'table-secondary' : ''}>
                      <td>{usuario.id}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {usuario.fotoPerfil && (
                            <img 
                              src={usuario.fotoPerfil} 
                              alt={usuario.nombre}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                              }}
                            />
                          )}
                          {usuario.nombre}
                        </div>
                      </td>
                      <td>{usuario.mail}</td>
                      <td>{usuario.nombreUsuario}</td>
                      <td>
                        {usuario.esAdmin ? (
                          <span className="badge bg-warning text-dark">ADMIN</span>
                        ) : usuario.rolPostulante ? (
                          <span className="badge bg-info">POSTULANTE</span>
                        ) : (
                          <span className="badge bg-primary">EMPLEADOR</span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${usuario.activo ? 'bg-success' : 'bg-danger'}`}>
                          {usuario.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => abrirModalEdicion(usuario)}
                            title="Editar"
                          >
                            <FaEdit />
                          </button>
                          
                          <button
                            className={`btn btn-sm ${usuario.activo ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => confirmarAccion('toggle', usuario)}
                            title={usuario.activo ? 'Desactivar' : 'Activar'}
                          >
                            {usuario.activo ? <FaUserSlash /> : <FaUserCheck />}
                          </button>
                          
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => confirmarAccion('eliminar', usuario)}
                            title="Eliminar"
                            disabled={usuario.id === usuarioLogueado?.id}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de edición */}
      {showModal && (
        <div className="gestion-usuarios-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="gestion-usuarios-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="gestion-usuarios-modal-header">
              <h4>Editar Usuario</h4>
              <button className="gestion-usuarios-close-button" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="gestion-usuarios-modal-body">
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="mail"
                  value={formData.mail}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombreUsuario"
                  value={formData.nombreUsuario}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  className="form-control"
                  rows={3}
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="rolPostulante"
                    checked={formData.rolPostulante}
                    onChange={handleInputChange}
                  />
                  Es Postulante
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="esAdmin"
                    checked={formData.esAdmin}
                    onChange={handleInputChange}
                  />
                  Es Administrador
                </label>
              </div>
            </div>
            <div className="gestion-usuarios-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={guardarCambios}>
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="gestion-usuarios-modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="gestion-usuarios-modal-content gestion-usuarios-modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="gestion-usuarios-modal-header">
              <h4>Confirmar acción</h4>
              <button className="gestion-usuarios-close-button" onClick={() => setShowConfirmModal(false)}>&times;</button>
            </div>
            <div className="gestion-usuarios-modal-body">
              {accionConfirmar?.tipo === 'eliminar' && (
                <p>¿Estás seguro de que deseas <strong>eliminar permanentemente</strong> al usuario <strong>{accionConfirmar.usuario.nombre}</strong>?</p>
              )}
              {accionConfirmar?.tipo === 'toggle' && (
                <p>¿Estás seguro de que deseas <strong>{accionConfirmar.usuario.activo ? 'desactivar' : 'activar'}</strong> al usuario <strong>{accionConfirmar.usuario.nombre}</strong>?</p>
              )}
            </div>
            <div className="gestion-usuarios-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </button>
              <button 
                className={`btn ${accionConfirmar?.tipo === 'eliminar' ? 'btn-danger' : 'btn-warning'}`}
                onClick={ejecutarAccion}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}