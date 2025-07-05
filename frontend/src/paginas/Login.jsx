import React, { useState, useContext } from 'react';
import styles from './Login.module.css';
import logo from '../assets/RoDi-LogoPeque3.jpg';
import postulanteImg from '../assets/Empleado.png';
import empleadorImg from '../assets/Empleador.png';
import { BiCog } from "react-icons/bi";
import { DatosContexto } from '../datosContext';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [vista, setVista] = useState("login");

  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalUsuarioExistente, setMostrarModalUsuarioExistente] = useState(false);

  const { usuarios, setUsuarios, setUsuarioLogueado } = useContext(DatosContexto);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMail('');
    setErrorPassword('');

    if (!email) setErrorMail('Este campo es obligatorio');
    if (!password) setErrorPassword('Este campo es obligatorio');

    if (email && password) {
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.contraseña === password
      );
      if (usuarioEncontrado) {
        setUsuarioLogueado(usuarioEncontrado);
        onLogin();
      } else {
        setMostrarModalError(true);
      }
    }
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const usuario = e.target.usuario.value;

    const emailExiste = usuarios.some(u => u.email === email);
    const usuarioExiste = usuarios.some(u => u.usuario === usuario);

    if (emailExiste || usuarioExiste) {
      setMostrarModalUsuarioExistente(true);
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      usuario,
      email,
      contraseña: password,
      rol: rolSeleccionado
    };

    setUsuarios(prev => [...prev, nuevoUsuario]);
    setEmail('');
    setPassword('');
    setRolSeleccionado('');
    setVista('login');
    setMostrarModalRegistro(true);
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


      {vista === 'login' && (
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
      )}
    </div>


          {vista === 'registro' && (
            <form onSubmit={handleRegistro}>
              <div className={styles.datos}>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="usuario">Nombre de usuario</label>
                <input type="text" id="usuario" name="usuario" placeholder="Usuario deseado" required />

                <label htmlFor="contraseña">Contraseña</label>
                <input type="password" id="contraseña" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label htmlFor="rol">Rol</label>
                <select id="rol" value={rolSeleccionado} onChange={(e) => setRolSeleccionado(e.target.value)} className={styles.selectRol} required>
                  <option value="" disabled>Selecciona un rol</option>
                  <option value="postulante">Postulante</option>
                  <option value="empleador">Empleador</option>
                  <option value="Administrador">Administrador</option>
                </select>
                {!rolSeleccionado && <p className={styles.error}>Por favor seleccioná un rol</p>}

                <button type="submit" className={styles.submit}>Registrarme</button>

                <div className="text-center mt-3">
                  <a href="#" onClick={(e) => { e.preventDefault(); setVista('login'); }}>Volver al inicio de sesión</a>
                </div>
              </div>
            </form>
          )}

          {vista === 'recuperar' && (
            <form>
              <div className={styles.datos}>
                <label htmlFor="emailRecuperar">Email para recuperar contraseña</label>
                <input type="email" id="emailRecuperar" placeholder="tu@email.com" />
                <button type="submit" className={styles.submit}>Recuperar contraseña</button>
                <div className="text-center mt-3">
                  <a href="#" onClick={(e) => { e.preventDefault(); setVista('login'); }}>Volver al inicio de sesión</a>
                </div>
              </div>
            </form>
          )}

          {mostrarModalError && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-danger text-white">
                    <h5 className="modal-title">Error al iniciar sesión</h5>
                    <button type="button" className="btn-close" onClick={() => setMostrarModalError(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>Usuario no registrado o datos incorrectos.</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setMostrarModalError(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mostrarModalRegistro && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-success text-white">
                    <h5 className="modal-title">Registro exitoso</h5>
                    <button type="button" className="btn-close" onClick={() => setMostrarModalRegistro(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>¡Tu cuenta fue registrada correctamente! Ahora podés iniciar sesión.</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-success" onClick={() => setMostrarModalRegistro(false)}>Aceptar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mostrarModalUsuarioExistente && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-warning text-dark">
                    <h5 className="modal-title">Error en el registro</h5>
                    <button type="button" className="btn-close" onClick={() => setMostrarModalUsuarioExistente(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>El nombre de usuario o el email ya están en uso.</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-warning" onClick={() => setMostrarModalUsuarioExistente(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <br />
          <a href="#" onClick={(e) => { e.preventDefault(); setVista('recuperar'); }}>Olvidé Mi Contraseña</a>
          <br />
          <p>
            ¿No tienes cuenta?
            <a href="#" onClick={(e) => { e.preventDefault(); setVista('registro'); }}> Registrate</a>
          </p>
          <br />
    </div>

    
    </div>



  );
}