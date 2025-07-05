import React, { Component, useContext } from 'react'
import OfertasCarousel from '../componentes/carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DatosContexto } from '../datosContext';
import CuadroEmpDest from '../componentes/cuadroEmpDest';
export default  function PantallaHomePostulante () {

    const {usuarioLogueado} = useContext(DatosContexto) //guardo el usuario logueado
   
    
   
    return (
      <div className="vistaEstirada">
        <div style={{textAlign:"start"}}>
          {usuarioLogueado ? (
            usuarioLogueado.rol === 'empleador' ? (<h2>Empleador</h2> ) : usuarioLogueado.rol === 'postulante' ? (<h2>Postulante</h2>) : (<h2>Administrador</h2>)
          ) : (<p>no has iniciado sesion</p>)
          }

          <p>{usuarioLogueado.nombre} ({usuarioLogueado.rol})</p>
        </div>
        
        <OfertasCarousel />
          <br></br>
        <CuadroEmpDest />
          
          
        
      </div>
    )

}

