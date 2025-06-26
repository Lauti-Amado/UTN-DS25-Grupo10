import React, { Component } from 'react'
import OfertasCarousel from '../componentes/carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import OfertaCard from '../componentes/ofertaCard';
export default  function PantallaHomePostulante () {
 
    return (
      <div>pantallaHome
      
        <OfertasCarousel />
        <br></br>
        <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} />
      
      </div>
    )

}

