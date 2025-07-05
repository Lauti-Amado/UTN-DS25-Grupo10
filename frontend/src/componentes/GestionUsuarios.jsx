import React, { useContext } from 'react';
import { DatosContexto } from '../datosContext';

export default function GestionUsuarios() {
  const { usuarios, setUsuarios } = useContext(DatosContexto);

  const eliminarUsuario = (id) => {
    const confirmado = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmado) {
      setUsuarios(prev => prev.filter(user => user.id !== id));
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
          <button onClick={() => eliminarUsuario(user.id)} style={{
            backgroundColor: "#d13a3a", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px"
          }}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
