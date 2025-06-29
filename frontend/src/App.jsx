import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './layouts/navBar/navBar';
import Footer from './componentes/Footer.jsx';
import Login from './paginas/Login.jsx';
import PantallaHomePostulante from './paginas/pantallaHomePostulante.jsx';
import PantallaTrabajo from './paginas/pantallaTrabajos.jsx';
import Perfil from './paginas/Perfil.jsx';

function App() {
  const [logueado, setLogueado] = useState(() => localStorage.getItem('logueado') === 'true');

  const handleLogin = () => {
    localStorage.setItem('logueado', 'true');
    setLogueado(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('logueado');
    setLogueado(false);
  };

  return (
    <Router>
      {logueado && <NavBar onLogout={handleLogout} />}
      {logueado ? (
        <div className="contenidoPrincipal">
          <Routes>
            <Route path="/inicio" element={<PantallaHomePostulante />} />
            <Route path="/trabajos" element={<PantallaTrabajo />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="*" element={<Navigate to="/inicio" />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
