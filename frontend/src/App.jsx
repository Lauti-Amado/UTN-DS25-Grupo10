import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './layouts/navBar/navBar';
import Footer from './componentes/Footer.jsx';
import Login from './paginas/Login.jsx';
import PantallaHomePostulante from './paginas/pantallaHomePostulante.jsx';
import PantallaTrabajo from './paginas/pantallaTrabajos.jsx';
import Perfil from './paginas/Perfil.jsx';
import { DatosProvider, DatosContexto } from './datosContext.jsx';

function AppContent() {
  const { usuarioLogueado, setUsuarioLogueado } = useContext(DatosContexto);

  const handleLogout = () => {
    setUsuarioLogueado(null);
  };

  return (
    <Router>
      {usuarioLogueado && <NavBar onLogout={handleLogout} />}
      {usuarioLogueado ? (
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
          <Route path="/" element={<Login onLogin={() => {}} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <DatosProvider>
      <AppContent />
    </DatosProvider>
  );
}

export default App;
