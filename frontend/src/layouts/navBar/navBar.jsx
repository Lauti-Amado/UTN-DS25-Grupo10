import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/RoDi-LogoPeque3.jpg";
import "./navBar.css";
import { BsPersonFillGear } from "react-icons/bs";
import { FaHouse } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { useContext, useState } from 'react';
import { DatosContexto } from '../../datosContext.jsx';

function NavBar({ onLogout }) {
  const { busquedaGlobal, setBusquedaGlobal, usuarios, setUsuarios } = useContext(DatosContexto);
  const navigate = useNavigate();

  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  const handleBuscar = (e) => {
    e.preventDefault();
    navigate('/trabajos');
  };

  const eliminarUsuario = (id) => {
    setIdAEliminar(id);
    setMostrarModal(true);
  };

  const eliminarConfirmado = () => {
    const nuevosUsuarios = usuarios.filter((u) => u.id !== idAEliminar);
    setUsuarios(nuevosUsuarios);
    setMostrarModal(false);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="w-100 py-1" fixed="top">
      <Container fluid>
        <Navbar.Brand>
          <Link to={"/"}>
            <img style={{ width: "50px", borderRadius: "50%" }} src={logo} alt="logoRodi" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/inicio"><FaHouse /><br />Inicio</Nav.Link>
            <Nav.Link as={Link} to="/trabajos"><MdOutlineWork /><br />Trabajos</Nav.Link>
            <Nav.Link as={Link} to="/perfil"><IoMdPerson /><br />Perfil</Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleBuscar}>
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
              value={busquedaGlobal}
              onChange={(e) => setBusquedaGlobal(e.target.value)}
            />
            <Button variant="outline-danger" type="submit">Buscar</Button>
          </Form>

          <Button variant="outline-light" className="ms-3"onClick={() => setMostrarUsuarios(!mostrarUsuarios)}>
            {mostrarUsuarios ? 'Ocultar usuarios' : <BsPersonFillGear style={{fontSize:"25px"}} />}
          </Button>

          {onLogout && (
            <Button variant="danger" className="ms-3 botonCerrar" onClick={onLogout}>
              Cerrar sesión
            </Button>
          )}

        </Navbar.Collapse>
      </Container>

      {mostrarUsuarios && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Gestión de Usuarios</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarUsuarios(false)}></button>
              </div>

              <div className="modal-body" style={{ maxHeight: "65vh", overflowY: "auto" }}>
                <Form className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nombre o email"
                    value={busquedaGlobal}
                    onChange={(e) => setBusquedaGlobal(e.target.value)}
                  />
                </Form>

                {usuarios.length === 0 ? (
                  <p className="text-center">No hay usuarios registrados.</p>
                ) : (
                  <ul className="list-group">
                    {usuarios
                      .filter((usuario) =>
                        (usuario.nombre + usuario.email)
                          .toLowerCase()
                          .includes(busquedaGlobal.toLowerCase())
                      )
                      .map((usuario) => (
                        <li key={usuario.id} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-start flex-column flex-md-row">
                            <div className="mb-2 mb-md-0">
                              <p><strong>Nombre:</strong> {usuario.nombre}</p>
                              <p><strong>Usuario:</strong> {usuario.usuario}</p>
                              <p><strong>Email:</strong> {usuario.email}</p>
                              <p><strong>Contraseña:</strong> {usuario.contraseña}</p>
                              <p><strong>Rol:</strong> {usuario.rol}</p>
                            </div>
                            <div className="text-end">
                              <button
                                className="btn btn-bordo-danger"
                                onClick={() => eliminarUsuario(usuario.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que querés eliminar este usuario?</p>
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
    </Navbar>
  );
}

export default NavBar;