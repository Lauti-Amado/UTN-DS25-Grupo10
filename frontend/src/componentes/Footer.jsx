import React from 'react';
import styles from '../paginas/Login.module.css';
import { Link } from 'react-router-dom';

function Footer() {
  

  return (
    
    <footer className={styles.footer}>
      <div className={styles.footerCentro}>
        <p>© RoDi - Todos los derechos reservados</p>
      </div>
    </footer>


  );
}

export default Footer;