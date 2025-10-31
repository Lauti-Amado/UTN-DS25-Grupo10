import React, { useContext } from 'react';
import OfertasCarousel from '../componentes/carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { DatosContexto } from '../datosContext';
import TrabajosDisponibles from '../componentes/TrabajosDisponibles';
import PostulantesScrollBox from '../componentes/PostulantesScrollBox';
import GestionUsuarios from '../componentes/GestionUsuarios';
import { IoNewspaper } from "react-icons/io5";
import { FaUserSlash } from "react-icons/fa";
import './pantallaHomePostulante.css';

export default function PantallaHomePostulante() {
  const { usuarioLogueado } = useContext(DatosContexto);

  return (
    <div className="vistaEstirada">
      {usuarioLogueado ? (
        usuarioLogueado.esAdmin ? (
          // Vista del ADMINISTRADOR
          <div>
            <h2 className='section-title'>Panel de Administración</h2>
            
            {/* Carrusel de usuarios desactivados */}
            <h4 className="animate__animated animate__fadeInUp mb-4">
              Usuarios Desactivados <FaUserSlash />
            </h4>
            <div className="animate__animated animate__fadeInUp mb-4">
              <OfertasCarousel />
            </div>

            {/* Gestión de usuarios */}
            <h4 className="animate__animated animate__fadeInUp mb-4 mt-5">
              Gestión de Usuarios
            </h4>
            <div className="animate__animated animate__fadeInUp">
              <GestionUsuarios />
            </div>
          </div>
        ) : usuarioLogueado.rolPostulante ? (
          //  Vista del Postulante
          <div>
            <h2 className='section-title'>Postulante</h2>
            <h4 className="animate__animated animate__fadeInUp mb-4">Tus Postulaciones <IoNewspaper /></h4>
            
            <div className="animate__animated animate__fadeInUp mb-4">
              <OfertasCarousel />
            </div>

            <div className="trabajos-section animate__animated animate__fadeInUp">
              <TrabajosDisponibles />
            </div>
          </div>
        ) : (
          // Vista del Empleador
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
        <p>No has iniciado sesión</p>
      )}
    </div>
  );
}