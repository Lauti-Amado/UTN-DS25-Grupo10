import React, { useState,useContext } from 'react';
import styles from './Login.module.css';
import logo from '../assets/RoDi-LogoPeque3.jpg';
import tuercaLogo from '../assets/Configuracion.png';
import postulanteImg from '../assets/Empleado.png';
import empleadorImg from '../assets/Empleador.png';
import Footer from '../componentes/Footer.jsx';
import { BiCog } from "react-icons/bi"; // Íconos de FontAwesome
import { DatosContexto } from '../datosContext';


export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');

  const {usuarios, setUsuarioLogueado} = useContext(DatosContexto) //traigo los usuarios que estan en el archivo datosContexto.jsx
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMail('');
    setErrorPassword('');

    if (!email) setErrorMail('Este campo es obligatorio');
    if (!password) setErrorPassword('Este campo es obligatorio');

    if (email && password){
      const usuarioEncontrado = usuarios.find( 
        (u) => u.email == email && u.contraseña == password //si email y contraseña ingresados coincide con email y contraseña de algun usuario que este en el datosContexto.jsx
      );
      if (usuarioEncontrado){
        setUsuarioLogueado(usuarioEncontrado) //guarda usuario activo
        onLogin(); //si lo encientra inicia sesion
      } else{
        alert("Usuario no registrado o datos incorrectos");  //si no lo encuentra tira alert
      }
    } 
  };

  return (
    <div className={styles.loginPageWrapper}>
    <div className={styles.bodyLogin}>
      <header className={styles.header}>
        <img src={logo} alt="Logo de RoDi" className={styles.logo} />
        <h1 className={styles.title}>RoDi</h1>
        <BiCog className={styles.tuercaLogo} />
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