import React, { useContext, useEffect, useState } from "react";
import { DatosContexto } from "../datosContext";

export default function GestionUsuarios() {
  const { usuarioLogueado } = useContext(DatosContexto);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (usuarioLogueado?.esAdmin) {
        const token = localStorage.getItem("token");
        try {
          const res = await fetch("http://localhost:3000/usuarios", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) {
            setUsuarios(data.data || []);
          }
        } catch (err) {
          console.error("Error cargando usuarios:", err);
        }
      }
    };

    fetchUsuarios();
  }, [usuarioLogueado]);

  const eliminarUsuario = async (id) => {
    const confirmado = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmado) {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setUsuarios((prev) => prev.filter((u) => u.id !== id));
        }
      } catch (err) {
        console.error("Error eliminando usuario:", err);
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Usuarios Registrados</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        usuarios.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>Nombre:</strong> {user.nombre}
            </p>
            <p>
              <strong>Email:</strong> {user.mail}
            </p>
            <p>
              <strong>Usuario:</strong> {user.nombreUsuario}
            </p>
            <p>
              <strong>Rol:</strong>{" "}
              {user.esAdmin
                ? "ADMIN"
                : user.rolPostulante
                ? "POSTULANTE"
                : "EMPLEADOR"}
            </p>
            <button
              onClick={() => eliminarUsuario(user.id)}
              className="btn btn-danger d-flex align-items-center gap-2"
            >
              <i className="bi bi-trash"></i> Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
}
