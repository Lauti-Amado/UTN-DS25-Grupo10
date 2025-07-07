// FormularioPostulacionModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function FormularioPostulacionModal({ show, handleClose, empresa }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    localidad: '',
    pais: '',
    genero: '',
    descripcion: '',
    archivo: null,
  });


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        genero: checked ? value : '',
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        archivo: files[0],
      });
    }else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('Formulario enviado con éxito');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size='lg' scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title>Postularse a {empresa?.nombre || empresa?.titulo || "una empresa"}</Modal.Title>


      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={formData.nombre} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control name="apellido" value={formData.apellido} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formLocalidad">
            <Form.Label>Localidad</Form.Label>
            <Form.Select name="localidad" value={formData.localidad} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Rosario">Rosario</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formPais">
            <Form.Label>País</Form.Label>
            <Form.Select name="pais" value={formData.pais} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Uruguay">Uruguay</option>
            </Form.Select>
          </Form.Group>

       

          <Form.Group controlId="formGenero">
            <Form.Label>Género</Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label="Masculino"
                name="genero"
                value="Masculino"
                checked={formData.genero === 'Masculino'}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Femenino"
                name="genero"
                value="Femenino"
                checked={formData.genero === 'Femenino'}
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Otro"
                name="genero"
                value="Otro"
                checked={formData.genero === 'Otro'}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formArchivo">
            <Form.Label className='mt-3' style={{fontWeight:"bold"}}>Subir Curriculum</Form.Label>
            <Form.Control style={{borderColor:"brown"}} type="file" onChange={handleChange}/>
          </Form.Group>

          <Button className="mt-3" variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
