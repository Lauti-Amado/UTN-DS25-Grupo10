import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Login.module.css';
import logo from '../assets/RoDi-LogoPeque3.jpg';
import postulanteImg from '../assets/Empleado.png';
import empleadorImg from '../assets/Empleador.png';
import { BiCog } from "react-icons/bi";
import { DatosContexto } from '../datosContext';
import { setToken } from '../helpers/auth';
import { loginSchema } from '../validations/loginSchema';
import { registroSchema } from '../validations/registroSchema';
import { API_URL } from '../config';


export default function Login({ onLogin }) {
  const [nombreUsuario, setUsuario] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [vista, setVista] = useState("login");

  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalUsuarioExistente, setMostrarModalUsuarioExistente] = useState(false);
  const [mostrarModalErroresRegistro, setMostrarModalErroresRegistro] = useState(false);

  const { usuarios, setUsuarios, setUsuarioLogueado } = useContext(DatosContexto);
  const [mostrarModalRecuperacionError, setMostrarModalRecuperacionError] = useState(false);
  const [mostrarModalRecuperacion, setMostrarModalRecuperacion] = useState(false);
  const [mostrarModalUsuarioDuplicado, setMostrarModalUsuarioDuplicado] = useState(false);

  const [mostrarModalConfiguracion, setMostrarModalConfiguracion] = useState(false);
  const [temaOscuro, setTemaOscuro] = useState(false);

  const [erroresRegistro, setErroresRegistro] = useState([]);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin, isSubmitting: isSubmittingLogin }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const {
    register: registerRegistro,
    handleSubmit: handleSubmitRegistro,
    formState: { errors: errorsRegistro, isSubmitting: isSubmittingRegistro },
    setValue: setValueRegistro
  } = useForm({
    resolver: yupResolver(registroSchema)
  });

  // Iniciar sesion con Yup
  const onSubmitLogin = async (data) => {
    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mail: data.email, contraseña: data.password })
      });

      const responseData = await res.json();
      setToken(responseData.token);
      console.log("Respuesta login:", responseData);

      if (res.ok) {
        setUsuarioLogueado({
          ...responseData.data.usuario,
          token: responseData.data.token,
        });
        localStorage.setItem("token", responseData.data.token);
        localStorage.setItem("usuarioID", responseData.data.usuario.id);
        onLogin();
      } else {
        setMostrarModalError(true);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMostrarModalError(true);
    }
  };

  // Registrar usuario con Yup
  const onSubmitRegistro = async (data) => {
    setErroresRegistro([]);

    const nuevoUsuario = {
      nombre: data.nombre,
      nombreUsuario: data.nombreUsuario,
      mail: data.email,
      contraseña: data.contraseña,
      rolPostulante: data.rol === "postulante"
    };

    try {
      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
        credentials: "include"
      });

      const responseData = await res.json();

      if (res.ok) {
        setMostrarModalRegistro(true);
        setVista("login");
        setRolSeleccionado("");
      } else {
        if (responseData.code === "USUARIO_DUPLICADO") {
          setMostrarModalUsuarioDuplicado(true);
        } else if (responseData.code === "MAIL_DUPLICADO") {
          setMostrarModalUsuarioExistente(true);
        } else if (responseData.errores) {
          setErroresRegistro(responseData.errores);
          setMostrarModalErroresRegistro(true);
        } else {
          setErroresRegistro([{ field: "general", message: responseData.message || "Error desconocido" }]);
          setMostrarModalErroresRegistro(true);
        }
      }
    } catch (err) {
      console.error(err);
      setErroresRegistro([{ field: "general", message: "Error al comunicarse con el servidor" }]);
    }
  };

  return (
    <div className={`${styles.loginPageWrapper} ${temaOscuro ? styles.temaOscuro : ''}`}>
      <div className={styles.bodyLogin}>
        <header className={styles.header}>
          <img src={logo} alt="Logo de RoDi" className={styles.logo} />
          <h1 className={styles.title}>RoDi</h1>
          <BiCog className={styles.tuercaLogo} onClick={() => setMostrarModalConfiguracion(true)} style={{ cursor: 'pointer' }} />
        </header>

        <div className={styles.contenedor}>
          {/* --- LOGIN --- */}
          {vista === 'login' && (
            <>
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

              <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                <div className={styles.datos}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Example@dominio"
                    {...registerLogin("email")}
                    className={errorsLogin.email ? styles.inputError : ''}
                  />
                  {errorsLogin.email && (
                    <span className={styles.error}>{errorsLogin.email.message}</span>
                  )}

                  <label htmlFor="contraseña">Contraseña</label>
                  <input
                    type="password"
                    id="contraseña"
                    placeholder="********"
                    {...registerLogin("password")}
                    className={errorsLogin.password ? styles.inputError : ''}
                  />
                  {errorsLogin.password && (
                    <span className={styles.error}>{errorsLogin.password.message}</span>
                  )}

                  <button type="submit" className={styles.submit} disabled={isSubmittingLogin}>
                    {isSubmittingLogin ? 'Ingresando...' : 'Iniciar Sesión'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* --- REGISTRO --- */}
          {vista === 'registro' && (
            <form onSubmit={handleSubmitRegistro(onSubmitRegistro)}>
              <div className={styles.datos}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Tu nombre"
                  {...registerRegistro("nombre")}
                  className={errorsRegistro.nombre ? styles.inputError : ''}
                />
                {errorsRegistro.nombre && (
                  <span className={styles.error}>{errorsRegistro.nombre.message}</span>
                )}

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="tu@email.com"
                  {...registerRegistro("email")}
                  className={errorsRegistro.email ? styles.inputError : ''}
                />
                {errorsRegistro.email && (
                  <span className={styles.error}>{errorsRegistro.email.message}</span>
                )}

                <label htmlFor="usuario">Nombre de usuario</label>
                <input
                  type="text"
                  id="nombreUsuario"
                  placeholder="Usuario deseado"
                  {...registerRegistro("nombreUsuario")}
                  className={errorsRegistro.nombreUsuario ? styles.inputError : ''}
                />
                {errorsRegistro.nombreUsuario && (
                  <span className={styles.error}>{errorsRegistro.nombreUsuario.message}</span>
                )}

                <label htmlFor="contraseña">Contraseña</label>
                <input
                  type="password"
                  id="contraseña"
                  placeholder="********"
                  {...registerRegistro("contraseña")}
                  className={errorsRegistro.contraseña ? styles.inputError : ''}
                />
                {errorsRegistro.contraseña && (
                  <span className={styles.error}>{errorsRegistro.contraseña.message}</span>
                )}

                <label htmlFor="rol">Rol</label>
                <select
                  id="rol"
                  {...registerRegistro("rol", {
                    onChange: (e) => setRolSeleccionado(e.target.value)
                  })}
                  className={errorsRegistro.rol ? `${styles.selectRol} ${styles.inputError}` : styles.selectRol}
                  value={rolSeleccionado}
                >
                  <option value="">Selecciona un rol</option>
                  <option value="postulante">Postulante</option>
                  <option value="empleador">Empleador</option>
                </select>
                {errorsRegistro.rol && (
                  <span className={styles.error}>{errorsRegistro.rol.message}</span>
                )}

                <button type="submit" className={styles.submit} disabled={isSubmittingRegistro}>
                  {isSubmittingRegistro ? 'Registrando...' : 'Registrarme'}
                </button>

                <div className="text-center mt-3">
                  <a href="#" onClick={(e) => { e.preventDefault(); setVista('login'); }}>Volver al inicio de sesión</a>
                </div>
              </div>
            </form>
          )}

          {vista === 'recuperar' && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const emailRecuperar = e.target.emailRecuperar.value;
              const existe = usuarios.some(u => u.email === emailRecuperar);
              if (existe) {
                setMostrarModalRecuperacion(true);
                setTimeout(() => {
                  setVista('login');
                }, 2000);
              } else {
                setMostrarModalRecuperacionError(true);
              }
            }}>
              <div className={styles.datos}>
                <label htmlFor="emailRecuperar">Email para recuperar contraseña</label>
                <input type="email" id="emailRecuperar" name="emailRecuperar" placeholder="tu@email.com" required />
                <button type="submit" className={styles.submit}>Recuperar contraseña</button>
                <div className="text-center mt-3">
                  <a href="#" onClick={(e) => { e.preventDefault(); setVista('login'); }}>Volver al inicio de sesión</a>
                </div>
              </div>
            </form>
          )}

          {/* Modals */}
          {mostrarModalError && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-danger text-white">
                    <h5 className="modal-title">Error</h5>
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
                    <p>El email ya está en uso, intente iniciar sesion o recuperar la contraseña.</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-warning" onClick={() => setMostrarModalUsuarioExistente(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mostrarModalRecuperacion && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-info text-white">
                    <h5 className="modal-title">Correo enviado</h5>
                    <button type="button" className="btn-close" onClick={() => {
                      setMostrarModalRecuperacion(false);
                      setVista('login');
                    }}></button>
                  </div>
                  <div className="modal-body">
                    <p>Se ha enviado un correo con los pasos para recuperar tu contraseña.</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-info" onClick={() => {
                      setMostrarModalRecuperacion(false);
                      setVista('login');
                    }}>Aceptar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mostrarModalRecuperacionError && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-danger text-white">
                    <h5 className="modal-title">Correo no registrado</h5>
                    <button type="button" className="btn-close" onClick={() => setMostrarModalRecuperacionError(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>El correo ingresado no está registrado en el sistema.</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-danger" onClick={() => setMostrarModalRecuperacionError(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mostrarModalConfiguracion && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="modal-header bg-dark text-white">
                    <h5 className="modal-title">Configuración (En Proceso)</h5>
                    <button type="button" className="btn-close" onClick={() => setMostrarModalConfiguracion(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="temaOscuroSwitch"
                        checked={temaOscuro}
                        onChange={() => setTemaOscuro(!temaOscuro)}
                      />
                      <label className="form-check-label" htmlFor="temaOscuroSwitch">
                        Tema oscuro
                      </label>
                    </div>
                    <hr />
                    <p className="text-muted mb-0">Idioma:</p>
                    <select className="form-select mt-2" disabled>
                      <option>Español</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-dark" onClick={() => setMostrarModalConfiguracion(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mostrarModalErroresRegistro && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-danger text-white">
                    <h5 className="modal-title">Error en el registro</h5>
                    <button type="button" className="btn-close" onClick={() => setMostrarModalErroresRegistro(false)}></button>
                  </div>
                  <div className="modal-body">
                    <ul>
                      {erroresRegistro.map((err, i) => (
                        <li key={i}><strong>{err.field}:</strong> {err.message}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-danger" onClick={() => setMostrarModalErroresRegistro(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mostrarModalUsuarioDuplicado && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-warning text-dark">
                    <h5 className="modal-title">Nombre de usuario en uso</h5>
                    <button type="button" className="btn-close" onClick={() => setMostrarModalUsuarioDuplicado(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>El nombre de usuario que ingresaste ya está en uso. Por favor, elegí otro.</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-warning" onClick={() => setMostrarModalUsuarioDuplicado(false)}>Cerrar</button>
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
    </div>
  );
}