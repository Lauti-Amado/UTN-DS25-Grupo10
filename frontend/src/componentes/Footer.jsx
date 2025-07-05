import React from 'react';
import perfilLogo from '../assets/InicioSesion.png';
import styles from '../paginas/Login.module.css';
import { Link } from 'react-router-dom';

function Footer() {
  

  return (
    
    <footer className={styles.footer}>
      <div className={styles.footerCentro}>
        <p>© RoDi - Todos los derechos reservados</p>
      </div>
      <Link to='/perfil'><img src={perfilLogo} alt="Perfil Logo" className={styles.footerLogo} /></Link>
    </footer>


  );
}

export default Footer;