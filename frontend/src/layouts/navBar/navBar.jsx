import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/RoDi-LogoPeque3.jpg";
import "./navBar.css";
import { FaHouse } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { useContext } from 'react';
import { DatosContexto } from '../../datosContext.jsx';

function NavBar({ onLogout }) {
  const { busquedaGlobal, setBusquedaGlobal } = useContext(DatosContexto);
  const navigate = useNavigate();

  const handleBuscar = (e) => {
    e.preventDefault();
    navigate('/trabajos');
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

          {onLogout && (
            <Button variant="danger" className="ms-3" onClick={onLogout}>
              Cerrar sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;