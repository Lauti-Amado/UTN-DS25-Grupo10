import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Acordion from '../componentes/acordion';

export default function PantallaTrabajos() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state?.ofertaId && location.state?.scrollToOferta) {
      console.log("Navegando a oferta:", location.state.ofertaId, "Postulante:", location.state.postulanteId);
      
      const scrollAndExpandToOferta = () => {
        const element = document.getElementById(`oferta-${location.state.ofertaId}`);
        
        if (element) {
          console.log("✅ Elemento de oferta encontrado");
          
          // Expandir  acordeon
          const accordionButton = element.querySelector('.accordion-button');
          if (accordionButton && accordionButton.classList.contains('collapsed')) {
            console.log("📂 Expandiendo acordeón...");
            accordionButton.click();
          }
          
          // Dar tiempo para que se expanda y hacer scroll
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            
            // Si hay un postulanteId, abrir el modal de postulados después del scroll
            if (location.state.postulanteId) {
              setTimeout(() => {
                const botonVerPostulados = element.querySelector('[data-action="ver-postulados"]');
                if (botonVerPostulados) {
                  console.log("👥 Abriendo modal de postulados...");
                  botonVerPostulados.click();
                }
              }, 500);
            }
          }, 200);
        } else {
          console.log("⏳ Elemento no encontrado, reintentando...");
          setTimeout(scrollAndExpandToOferta, 100);
        }
      };

      setTimeout(scrollAndExpandToOferta, 500);
    }
    else if (location.state?.scrollToOferta && location.state?.mensaje) {
      console.log("Intentando scrollear a oferta (método antiguo):", location.state.mensaje);
      
      const scrollToElement = () => {
        const element = document.getElementById(`oferta-${location.state.mensaje}`);
        if (element) {
          console.log("Elemento encontrado, scrolleando...");
          
          const accordionButton = element.querySelector('.accordion-button');
          if (accordionButton && accordionButton.classList.contains('collapsed')) {
            accordionButton.click();
          }
          
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            });
          }, 100);
        } else {
          console.log("Elemento no encontrado, reintentando...");
          setTimeout(scrollToElement, 100);
        }
      };

      setTimeout(scrollToElement, 500);
    }
    
    setIsLoading(false);
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
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
      <Acordion 
        ofertaIdInicial={location.state?.ofertaId}
        postulanteDestacadoId={location.state?.postulanteId}
      />
    </div>
  );
}