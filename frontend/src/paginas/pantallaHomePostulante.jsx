import React, { useContext, useState } from 'react';
import OfertasCarousel from '../componentes/carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DatosContexto } from '../datosContext';
import CuadroEmpDest from '../componentes/cuadroEmpDest';
import TrabajosDisponibles from '../componentes/TrabajosDisponibles';
import PostulantesScrollBox from '../componentes/PostulantesScrollBox';
import { Button } from 'react-bootstrap';

export default function PantallaHomePostulante() {
  const { usuarioLogueado } = useContext(DatosContexto); // guardo el usuario logueado
  const [mostrarEmpresas, setMostrarEmpresas] = useState(false);

  return (
    <div className="vistaEstirada">
      <div style={{ textAlign: "start" }}>
        {usuarioLogueado ? (
          !usuarioLogueado.rolPostulante ? (
            // Empleador
            <div>
              <h2 style={{ textDecoration: "brown 1.5px underline" }}>Empleador</h2>
              <OfertasCarousel />
              <br />
              <PostulantesScrollBox />
            </div>
          ) : (
            // Postulante
            <div>
              <h2 style={{ textDecoration: "brown 1.5px underline" }}>Postulante</h2>
              <OfertasCarousel />
              <br />

              <Button
                variant="dark"
                className="mb-3 mt-3 float-end"
                onClick={() => setMostrarEmpresas(!mostrarEmpresas)}
              >
                {mostrarEmpresas
                  ? 'Ocultar empresas destacadas'
                  : 'Mostrar empresas destacadas'}
              </Button>

              <TrabajosDisponibles />
              {mostrarEmpresas && <CuadroEmpDest />}
            </div>
          )
        ) : (
          <p>No has iniciado sesión</p>
        )}
      </div>
    </div>
  );
}
