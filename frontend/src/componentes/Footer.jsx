import React from 'react';
import perfilLogo from '../assets/InicioSesion.png';
import styles from '../paginas/Login.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerCentro}>
        <p>© RoDi - Todos los derechos reservados</p>
      </div>
      <img src={perfilLogo} alt="Perfil Logo" className={styles.footerLogo} />
    </footer>


  );
}

export default Footer;