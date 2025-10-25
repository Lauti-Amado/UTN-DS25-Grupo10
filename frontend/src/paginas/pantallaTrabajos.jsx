import React, { useEffect } from 'react'
import Acordion from '../componentes/acordion'

export default function PantallaTrabajos() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToOferta) {
      // Dar tiempo al acordeón para renderizarse
      setTimeout(() => {
        const element = document.getElementById(`oferta-${location.state.mensaje}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  
    return (
      <div className="vistaEstirada">
      <h1 style={{color:"brown", textTransform: "uppercase", fontSize: "2rem", fontWeight: 600, marginBottom: "1rem",  borderBottom: "2px solid brown",  display: "inline-block",  paddingBottom: "0.5rem"}}>Ofertas de trabajos</h1>
      <Acordion />
      </div>
    );
}
