import React, { useContext, useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DatosContexto } from '../datosContext';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FormularioPostulacionModal from '../componentes/FormularioPostulacionModal';

export default function EmpresasDestacadas() {
  const { usuarioLogueado } = useContext(DatosContexto); // usuario actual
  const location = useLocation();

  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const empresas = [
    {
      logo: "../Facebook_Logo_(2019).png",
      nombre: "Facebook",
      descripcion: "Red social global fundada por Mark Zuckerberg. Parte de Meta Platforms, enfocada en conectar personas en todo el mundo.",
      puestoBacante: "Programador Frontend"
    },
    {
      logo: "../logoInsta2.png",
      nombre: "Instagram",
      descripcion: "Aplicación para compartir fotos y videos, también propiedad de Meta Platforms. Popular por sus historias y reels.",
      puestoBacante: "Programador Backend"
    },
    {
      logo: "../logoCocaCola.png",
      nombre: "Coca-Cola",
      descripcion: "Empresa multinacional de bebidas, famosa por su refresco insignia. Fundada en 1892 en EE.UU.",
      puestoBacante: "QA Tester"
    },
    {
      logo: "../logoMercadoLibre.png",
      nombre: "Mercado Libre",
      descripcion: "Empresa líder en comercio electrónico en América Latina. Fundada en Argentina en 1999, ofrece también servicios financieros.",
      puestoBacante: "Marketing Digital"
    }
  ];


  const refs = useRef(empresas.map(() => React.createRef()));

  
  useEffect(() => {
    if (location.state?.empresaDestino) {
      const index = empresas.findIndex(e => e.nombre === location.state.empresaDestino);
      if (index !== -1) {
        setTimeout(() => {
          refs.current[index].current?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, [location]);

  
  const handlePostular = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setModalVisible(true);
  };

  return (
    <div className="vistaEpresasDestacadas container py-4">
      <h1 className="mb-4">Empresas destacadas</h1>

      <div>
        {empresas.map((empresa, index) => (
          <div
            key={index}
            ref={refs.current[index]}
            className="mb-4 p-3 border rounded bg-dark text-light"
            style={{ textAlign: "start" }}
          >
            <img
              src={empresa.logo}
              alt={`Logo de ${empresa.nombre}`}
              style={{ width: "100px", display: "block", margin: "0 auto" }}
            />
            <p><strong>Nombre:</strong> {empresa.nombre}</p>
            <p><strong>Descripción:</strong> {empresa.descripcion}</p>
            <p><strong>Puesto vacante:</strong> {empresa.puestoBacante}</p>
            <div style={{ textAlign: "center" }}>
              <Button
                variant='danger'
                className="btn-ver-form"
                onClick={() => handlePostular(empresa)}
              >
                Postularse
              </Button>


            </div>
          </div>
        ))}

        <FormularioPostulacionModal
        show={modalVisible}
        handleClose={() => setModalVisible(false)}
        empresa={empresaSeleccionada}
        />

      </div>
    </div>
  );
}
