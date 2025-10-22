import React, { useState, useContext , useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Login.module.css';
import logo from '../assets/RoDi-LogoPeque3.jpg';
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
  const inputsRef = useRef([]);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalUsuarioExistente, setMostrarModalUsuarioExistente] = useState(false);
  const [mostrarModalErroresRegistro, setMostrarModalErroresRegistro] = useState(false);

  const { usuarios, setUsuarios, setUsuarioLogueado } = useContext(DatosContexto);
  const [mostrarModalRecuperacionError, setMostrarModalRecuperacionError] = useState(false);
  const [mostrarModalRecuperacion, setMostrarModalRecuperacion] = useState(false);
  const [mostrarModalUsuarioDuplicado, setMostrarModalUsuarioDuplicado] = useState(false);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
const [codigoError, setCodigoError] = useState("");
const [mostrarCambioContrasena, setMostrarCambioContrasena] = useState(false);
const [emailRecuperar, setEmailRecuperar] = useState("");


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
      const res = await fetch(`${API_URL}/usuarios`, {
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
  
  function handleInput(e, index) {
    const value = e.target.value;
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  }
  
  function renderCodeInputs() {
    return (
      <div className={styles.codeInputs}>
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            inputMode="numeric"
            pattern="[0-9]*"
            className={styles.input}
            ref={(el) => (inputsRef.current[i] = el)}
            onChange={(e) => handleInput(e, i)}
          />
        ))}
      </div>
    );
  }

  async function verificarCodigo() {
  const codigo = inputsRef.current.map((input) => input.value).join("");
  setCodigoVerificacion(codigo);
  setCodigoError("");

  if (codigo.length !== 6) {
    setCodigoError("El código debe tener 6 dígitos");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/usuarios/verificar-codigo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail: emailRecuperar, codigo }),
    });

    const data = await res.json();

    if (res.ok) {
      setMostrarCambioContrasena(true); // ✅ habilita la vista de cambio de contraseña
    } else {
      setCodigoError(data.message || "Código inválido o expirado");
    }
  } catch (err) {
    console.error(err);
    setCodigoError("Error al verificar el código");
  }
}



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
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const emailRecuperar = e.target.emailRecuperar.value;
      setEmailRecuperar(emailRecuperar); 

      try {
          const res = await fetch(`${API_URL}/usuarios/recuperar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mail: emailRecuperar })
        });

        const data = await res.json();

        if (res.ok) {
          setMostrarModalRecuperacion(true); // Modal éxito
          setTimeout(() => setVista('login'), 2000);
        } else {
          setMostrarModalRecuperacionError(true); // Modal error
        }
      } catch (err) {
        console.error(err);
        setMostrarModalRecuperacionError(true);
      }
    }}
  >
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
                    <div className={styles.container}>
  <h2>Ingresá tu código de 6 dígitos</h2>
  {renderCodeInputs()}
  {codigoError && <p className={styles.error}>{codigoError}</p>}
  <button
    type="button"
    className={styles.submit}
    onClick={verificarCodigo}
  >
    Verificar código
  </button>
</div>


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

         {mostrarCambioContrasena && (
  <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header bg-success text-white">
          <h5 className="modal-title">Cambiar contraseña</h5>
          <button type="button" className="btn-close" onClick={() => setMostrarCambioContrasena(false)}></button>
        </div>
        <div className="modal-body">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const nueva = e.target.nueva.value;
              const confirmar = e.target.confirmar.value;

              if (nueva !== confirmar) {
                setCodigoError("Las contraseñas no coinciden");
                return;
              }

              // ✅ Aquí usamos el código que el usuario ingresó (guardado en codigoVerificacion)
              const token = codigoVerificacion; // este es el código de 6 dígitos

              try {
                const res = await fetch(`${API_URL}/usuarios/reset-password`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ 
                    token, 
                    nuevaContrasena: nueva 
                  }),
                });

                const data = await res.json();

                if (res.ok) {
                  alert("Contraseña cambiada correctamente");
                  setMostrarCambioContrasena(false);
                  setVista("login");
                } else {
                  setCodigoError(data.message || "Error al cambiar la contraseña");
                }
              } catch (err) {
                console.error(err);
                setCodigoError("Error al comunicarse con el servidor");
              }
            }}
          >
            <label htmlFor="nueva">Nueva contraseña</label>
            <input type="password" id="nueva" name="nueva" required />
            <label htmlFor="confirmar">Confirmar contraseña</label>
            <input type="password" id="confirmar" name="confirmar" required />
            {codigoError && <p className={styles.error}>{codigoError}</p>}
            <button type="submit" className={styles.submit}>Guardar nueva contraseña</button>
          </form>
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