import React, { Component, useContext } from 'react'
import OfertasCarousel from '../componentes/carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DatosContexto } from '../datosContext';
import CuadroEmpDest from '../componentes/cuadroEmpDest';
import FiltroPostulantes from '../componentes/filtroPostulantes';
import TrabajosDisponibles from '../componentes/TrabajosDisponibles';

export default  function PantallaHomePostulante () {

    const {usuarioLogueado} = useContext(DatosContexto) //guardo el usuario logueado
   
    
   
    return (
      <div className="vistaEstirada">
        <div style={{textAlign:"start"}}>
          {usuarioLogueado ? (
            usuarioLogueado.rol === 'empleador' ? (
              <div>
       
                <h2 style={{textDecoration:"brown 1.5px underline"}}>Empleador</h2>
                <OfertasCarousel />
                  <br></br>
                <FiltroPostulantes />
              </div>
            ) : usuarioLogueado.rol === 'postulante' ? (
              
              <div>
                <h2 style={{textDecoration:" brown 1.5px underline"}}>Postulante</h2>
                  
                  <OfertasCarousel />
                  <br></br>

                  
                  <TrabajosDisponibles />
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
      </div>
    )

}