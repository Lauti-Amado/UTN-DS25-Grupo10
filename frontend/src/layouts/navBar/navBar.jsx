// navBar.jsx
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar({ onLogout }) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="navbar w-100" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">RoDi</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/inicio">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/trabajos">Trabajos</Nav.Link>
            <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
            />
            <Button variant="outline-danger">Buscar</Button>
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