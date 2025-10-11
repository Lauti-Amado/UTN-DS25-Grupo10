// src/pages/ResetPassword.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (nuevaContrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, nuevaContrasena }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al restablecer contraseña");
      }

      setMensaje(data.message);
      setNuevaContrasena("");
      setConfirmarContrasena("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Restablecer contraseña</h2>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Nueva contraseña:</label>
          <input
            type="password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Restablecer contraseña</button>
      </form>
    </div>
  );
};

export default ResetPassword;
