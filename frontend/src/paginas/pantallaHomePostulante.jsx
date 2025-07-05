import React, { Component, useContext } from 'react'
import OfertasCarousel from '../componentes/carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DatosContexto } from '../datosContext';
import CuadroEmpDest from '../componentes/cuadroEmpDest';

import { FiltroPostulante } from '../componentes/filtroPostulantes';

import TrabajosDisponibles from '../componentes/TrabajosDisponibles';

export default  function PantallaHomePostulante () {

    const {usuarioLogueado} = useContext(DatosContexto) //guardo el usuario logueado
   
    
   
    return (
      <div className="vistaEstirada">
        <div style={{textAlign:"start"}}>
          {usuarioLogueado ? (
            usuarioLogueado.rol === 'empleador' ? (
              <div>
       
                <h2>Empleador</h2>
                <OfertasCarousel />
                  <br></br>
                <FiltroPostulante />
              </div> 
            ) : usuarioLogueado.rol === 'postulante' ? (
              
              <div>
                <h2>Postulante</h2>
                  <OfertasCarousel />
                  <br></br>
                  <CuadroEmpDest />
              </div>
            ) : (
              
              <div>  
                <h2>Administrador</h2>
              </div>
            )
          ) : (<p>no has iniciado sesion</p>)
          }

          
        </div>
        
      
          
        
          
          <TrabajosDisponibles />
        
      </div>
    )

}

