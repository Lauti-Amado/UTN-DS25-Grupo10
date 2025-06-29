import React, { Component } from 'react'
import imagen from '../assets/perfilx.png';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Perfil() {
   
    return (
        <div>
        <img src= {imagen} />
        <button className="opcionesbot" type="button">Editar perfil</button>
        <button className="opcionesbot" type="button">Compartir perfil</button>
        <button className="opcionesbot" type="button">Agregar proyecto</button>
        </div>
    );
}