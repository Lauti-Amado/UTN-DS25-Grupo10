import React, { useContext } from 'react';
import { DatosContexto } from '../datosContext';
import { useNavigate } from 'react-router-dom';

export default function GestionUsuarios({ onLogout }) {
  const { usuarios, setUsuarios, usuarioLogueado, setUsuarioLogueado } = useContext(DatosContexto);
  const navigate = useNavigate();

  const eliminarUsuario = (id) => {
    const confirmado = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmado) {
      const nuevosUsuarios = usuarios.filter(user => user.id !== id);
      setUsuarios(nuevosUsuarios);

      if (usuarioLogueado?.id === id) {
        setUsuarioLogueado(null);
        localStorage.removeItem('usuarioLogueado');
        if (onLogout) onLogout();
        navigate('/login');
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Usuarios Registrados</h2>
      {usuarios.map(user => (
        <div key={user.id} style={{
          border: "1px solid #ccc", borderRadius: "10px", padding: "10px", marginBottom: "10px"
        }}>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Usuario:</strong> {user.usuario}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.rol}</p>
          <p><strong>Fecha de Nacimiento:</strong> {user.fnac}</p>
          <button
            onClick={() => eliminarUsuario(user.id)}
            style={{
              backgroundColor: "#d13a3a",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}