import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from '../assets/Logo.png';
import tuercaLogo from '../assets/Configuracion.png';
import postulanteImg from '../assets/Empleado.png';
import empleadorImg from '../assets/Empleador.png';
import Footer from '../componentes/Footer.jsx';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMail('');
    setErrorPassword('');

    if (!email) setErrorMail('Este campo es obligatorio');
    if (!password) setErrorPassword('Este campo es obligatorio');

    if (email && password) onLogin();
  };

  return (
    <div className={styles.loginPageWrapper}>
    <div className={styles.bodyLogin}>
      <header className={styles.header}>
        <img src={logo} alt="Logo de RoDi" className={styles.logo} />
        <h1 className={styles.title}>RoDi</h1>
        <img src={tuercaLogo} alt="Configuración" className={styles.tuercaLogo} />
      </header>

      <div className={styles.contenedor}>
        <div className={styles.opcionesRol}>
          <div
            className={`${styles.rol} ${rolSeleccionado === 'postulante' ? styles.rolSeleccionado : ''}`}
            onClick={() => setRolSeleccionado('postulante')}
          >
            <img src={postulanteImg} alt="Postulante" />
            <p>Postulante</p>
          </div>
          <div
            className={`${styles.rol} ${rolSeleccionado === 'empleador' ? styles.rolSeleccionado : ''}`}
            onClick={() => setRolSeleccionado('empleador')}
          >
            <img src={empleadorImg} alt="Empleador" />
            <p>Empleador</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.datos}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Example@dominio"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={styles.error}>{errorMail}</span>

            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={styles.error}>{errorPassword}</span>

            <button type="submit" className={styles.submit}>Iniciar Sesión</button>
          </div>
        </form>

        <br />
        <a href="#">Olvidé Mi Contraseña</a>
        <br />
        <p>
          ¿No tienes cuenta?
          <a href="#"> Registrate</a>
        </p>
        <br />
      </div>
      </div>
      </div>
  );
}