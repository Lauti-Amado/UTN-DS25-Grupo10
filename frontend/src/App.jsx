import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PantallaHomePostulante from './paginas/pantallaHomePostulante';
import NavBar from './layouts/navBar/navBar';
//los componentes deben ser importados con la primera lentra en mayuscula
function App() {


  return (

    <div>
      <NavBar />
      <div className='contenidoPrincipal'>
          <Router>
            <Routes>
              <Route path="/" element={<PantallaHomePostulante />} />
              <Route path="/home" element={<PantallaHomePostulante />} />
              
            </Routes>
          </Router>
      </div>
    </div>
  )
}

export default App
