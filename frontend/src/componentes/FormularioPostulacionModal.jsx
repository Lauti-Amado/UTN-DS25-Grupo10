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

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!empresa || !empresa.id) {
      alert("No se encontró la información de la empresa. Intenta de nuevo.");
      return;
    }

    //obtener usuarioID y token del localStorage
    const usuarioId = localStorage.getItem('usuarioID');
    const token = localStorage.getItem('token');

    // Validación de campos obligatorios
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.localidad ||
      !formData.pais ||
      !formData.genero ||
      !formData.descripcion ||
      !formData.archivo
    ) {
      alert("Por favor, completá todos los campos y subí tu curriculum.");
      return;
    }


     // Logs para depuración
    console.log('empresa.id:', empresa.id);
    console.log('usuarioId:', usuarioId);

    // Crear un objeto FormData para enviar los datos del formulario, incluyendo el archivo
    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('apellido', formData.apellido);
    formDataToSend.append('localidad', formData.localidad);
    formDataToSend.append('pais', formData.pais);
    formDataToSend.append('genero', formData.genero);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('curriculum', formData.archivo);
    formDataToSend.append('postuladoId', usuarioId);
    formDataToSend.append("ofertaId", empresa.id);

     // Mostrar el contenido de FormData en consola
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
        const response = await fetch(`http://localhost:3000/formularios/${empresa.id}`, {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${token}`, //  usando JWT
          },
        });

           // Mostrar status y respuesta en consola
        console.log('Status:', response.status);

        const result = await response.json();
        console.log('Respuesta backend:', result);

        if (result.success) {
          alert("Formulario enviado con éxito");
          handleClose();
        } else {
          alert("Error al enviar el formulario:" + (result.message || ''));
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      alert("Hubo un problema al enviar el formulario");
    }
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
