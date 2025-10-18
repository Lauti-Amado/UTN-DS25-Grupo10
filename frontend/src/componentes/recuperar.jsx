import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config'; // Asegúrate de que esta ruta sea correcta

export default function ResetPassword() {
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // ← Esto obtiene el :token de la URL

  useEffect(() => {
    if (!token) {
      setError('Token no válido');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('No se encontró el token de restablecimiento');
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setEnviando(true);
    setError('');
    setMensaje('');

    try {
      const response = await fetch(`${API_URL}/usuarios/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          nuevaContrasena: contraseña,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMensaje('✅ Contraseña actualizada correctamente. Redirigiendo al login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Error al restablecer la contraseña');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Restablecer Contraseña</h2>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label">Nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmar" className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmar"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={enviando || !token}
          >
            {enviando ? 'Procesando...' : 'Restablecer Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
}