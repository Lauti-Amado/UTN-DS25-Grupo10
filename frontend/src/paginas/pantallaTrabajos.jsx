import React from 'react'
import Acordion from '../componentes/acordion'

export default function PantallaTrabajos() {
    return (
      <div className="vistaEstirada">
      <h1 style={{color:"brown", textTransform: "uppercase", fontSize: "2rem", fontWeight: 600, marginBottom: "1rem",  borderBottom: "2px solid brown",  display: "inline-block",  paddingBottom: "0.5rem"}}>Ofertas de trabajos</h1>
      <Acordion />
      </div>
    );
}
