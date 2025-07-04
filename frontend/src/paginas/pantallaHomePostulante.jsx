import React, { Component, useContext } from 'react'
import OfertasCarousel from '../componentes/carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DatosContexto } from '../datosContext';
import CuadroEmpDest from '../componentes/cuadroEmpDest';
export default  function PantallaHomePostulante () {

    const {usuarioLogueado} = useContext(DatosContexto)
   
       console.log(usuarioLogueado.nombre)
    
   
    return (
      <div className="vistaEstirada">
        
        <OfertasCarousel />
        <br></br>
        pantallaHome
        
        <h2>Usuario</h2>
      
          <div>
            
              {usuarioLogueado ? (
                <p>Hola, {usuarioLogueado.nombre} ({usuarioLogueado.rol})</p>
              ) : (
                <p>No has iniciado sesión</p>
              )}
        
          </div>

          <CuadroEmpDest />
          
          
        
      </div>
    )

}

