import React from 'react';
import perfilLogo from '../assets/InicioSesion.png';
import styles from '../paginas/Login.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© RoDi - Todos los derechos reservados</p>
      <img src={perfilLogo} alt="Perfil Logo" className={styles.footerLogo} />
    </footer>

  );
}

export default Footer;