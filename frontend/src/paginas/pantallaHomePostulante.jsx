import React, { useContext, useState } from 'react';
import OfertasCarousel from '../componentes/carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css'; // ✨ Animaciones suaves
import { DatosContexto } from '../datosContext';
import CuadroEmpDest from '../componentes/cuadroEmpDest';
import TrabajosDisponibles from '../componentes/TrabajosDisponibles';
import PostulantesScrollBox from '../componentes/PostulantesScrollBox';
import { Button } from 'react-bootstrap';

// 🎨 Importamos los estilos personalizados
import './pantallaHomePostulante.css';

export default function PantallaHomePostulante() {
  const { usuarioLogueado } = useContext(DatosContexto);
  const [mostrarEmpresas, setMostrarEmpresas] = useState(false);

  return (
    <div className="vistaEstirada">
      {usuarioLogueado ? (
        usuarioLogueado.rolPostulante ? (
          // 🧑‍💼 Vista del Postulante
          <div>
            <h2>Postulante</h2>

            {/* 🎠 Carrusel animado de ofertas */}
            <div className="animate__animated animate__fadeInUp mb-4">
              <OfertasCarousel />
            </div>

            {/* 🔘 Botón para mostrar/ocultar empresas */}
            <Button
              variant="dark"
              className="mb-3 mt-3 float-end"
              onClick={() => setMostrarEmpresas(!mostrarEmpresas)}
            >
              {mostrarEmpresas
                ? 'Ocultar empresas destacadas'
                : 'Mostrar empresas destacadas'}
            </Button>

            {/* 💼 Sección de trabajos disponibles */}
            <div className="trabajos-section">
              <TrabajosDisponibles />
            </div>

            {/* 🏢 Empresas destacadas (con fade-in animado) */}
            {mostrarEmpresas && (
              <div className="empresas-section animate__animated animate__fadeIn">
                <CuadroEmpDest />
              </div>
            )}
          </div>
        ) : (
          // 🏭 Vista del Empleador
          <div>
            <h2>Empleador</h2>

            <div className="animate__animated animate__fadeInUp mb-4">
              <OfertasCarousel />
            </div>

            <div className="trabajos-section">
              <PostulantesScrollBox empleadorId={usuarioLogueado.id} />
            </div>
          </div>
        )
      ) : (
        // 🚪 Usuario no logueado
        <p>No has iniciado sesión</p>
      )}
    </div>
  );
}
