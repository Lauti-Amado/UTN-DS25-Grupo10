import React, { Component } from 'react'
import imagen from '../assets/perfilx.png';
import BotonesPerfil from '../componentes/BotonesPerfil';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Perfil() {
   
    return (
        <div>
           <img src= {imagen} />
           <BotonesPerfil texto="Editar perfil" />
           <BotonesPerfil texto="Compartir perfil" />
           <BotonesPerfil texto="Agregar proyecto" />
        </div>
    );
}