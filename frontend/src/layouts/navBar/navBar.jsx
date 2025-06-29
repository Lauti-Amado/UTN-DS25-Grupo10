import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
<link rel="stylesheet" href="navBar.css" />
function NavBar() {
  return (
    <Navbar expand="lg" bg="dark" variant='dark' className="body-tertiary navbar w-100" fixed='top'>
      <Container fluid>
        <Navbar.Brand href="/">RoDi</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/inicio">Inicio</Nav.Link>
            <Nav.Link href="/trabajos">Trabajos</Nav.Link>
          

          </Nav>
          <Form className="d-none mx-auto d-lg-flex" style={{ width: '50%', position: 'relative', right: '12%' }}>
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
            />
            <Button variant="outline-danger">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;