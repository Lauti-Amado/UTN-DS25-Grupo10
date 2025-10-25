import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Acordion from '../componentes/acordion';

export default function PantallaTrabajos() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state?.scrollToOferta) {
      console.log("Intentando scrollear a oferta:", location.state.mensaje); // Debug
      
      // Función para intentar scrollear
      const scrollToElement = () => {
        const element = document.getElementById(`oferta-${location.state.mensaje}`);
        if (element) {
          console.log("Elemento encontrado, scrolleando..."); // Debug
          
          // Expandir el acordeón
          const accordionButton = element.querySelector('.accordion-button');
          if (accordionButton && accordionButton.classList.contains('collapsed')) {
            accordionButton.click();
          }
          
          // Scroll suave
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            });
          }, 100);
        } else {
          console.log("Elemento no encontrado, reintentando..."); // Debug
          setTimeout(scrollToElement, 100);
        }
      };

      // Dar tiempo para que el componente se monte
      setTimeout(scrollToElement, 500);
    }
    setIsLoading(false);
  }, [location.state?.mensaje]);

  if (isLoading) {
    return <div className="text-center p-5">Cargando...</div>;
  }

  return (
    <div className="vistaEstirada">
      <h1 style={{
        color: "brown",
        textTransform: "uppercase",
        fontSize: "2rem",
        fontWeight: 600,
        marginBottom: "1rem",
        borderBottom: "2px solid brown",
        display: "inline-block",
        paddingBottom: "0.5rem"
      }}>
        Ofertas de trabajos
      </h1>
      <Acordion />
    </div>
  );
}