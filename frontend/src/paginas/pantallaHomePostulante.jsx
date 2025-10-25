import React, { useContext, useState } from 'react';
import OfertasCarousel from '../componentes/carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css'; // ✨ Animaciones suaves
import { DatosContexto } from '../datosContext';
import TrabajosDisponibles from '../componentes/TrabajosDisponibles';
import PostulantesScrollBox from '../componentes/PostulantesScrollBox';
import { Button } from 'react-bootstrap';
import { IoNewspaper } from "react-icons/io5";


// 🎨 Importamos los estilos personalizados
import './pantallaHomePostulante.css';

export default function PantallaHomePostulante() {
  const { usuarioLogueado } = useContext(DatosContexto);

  return (
    <div className="vistaEstirada">
      {usuarioLogueado ? (
        usuarioLogueado.rolPostulante ? (
          // 🧑‍💼 Vista del Postulante
          <div>
            <h2 className='section-title'>Postulante</h2>

            <h4 className="animate__animated animate__fadeInUp mb-4">Tus Postulaciones <IoNewspaper /></h4>
            
            {/* 🎠 Carrusel animado de ofertas */}
            <div className="animate__animated animate__fadeInUp mb-4">
              <OfertasCarousel />
            </div>


            {/* 💼 Sección de trabajos disponibles */}
            <div className="trabajos-section animate__animated animate__fadeInUp">
              <TrabajosDisponibles />
            </div>
          </div>

        ) : (
          // 🏭 Vista del Empleador
          <div>
            <h2 className='section-title'>Empleador</h2>

            <h4 className="animate__animated animate__fadeInUp mb-4">Tus Ofertas <IoNewspaper /></h4>
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
