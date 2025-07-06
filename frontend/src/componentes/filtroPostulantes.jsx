import React, { useState } from "react";
import datosPostulantes from "./datosPostulantes";
import "./filtroPostulantes.css";

export default function FiltroPostulantes() {
  const [filtro, setFiltro] = useState("");

  const postulantesFiltrados = datosPostulantes.filter(({ puesto }) =>
    puesto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="recuadroFiltro">
      <h2 className="tituloFiltro">Filtrar por Puesto</h2>

      <input
        type="text"
        placeholder="Buscar por puesto..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="inputFiltro"
      />

      <div className="listaPostulantes">
        {postulantesFiltrados.length > 0 ? (
          postulantesFiltrados.map(({ nombre, apellido, puesto }, index) => (
            <div key={index} className="itemFiltro">
              <strong>
                {nombre} {apellido}
              </strong>{" "}
              - {puesto}
            </div>
          ))
        ) : (
          <p className="itemFiltro">No se encontraron coincidencias.</p>
        )}
      </div>
    </div>
  );
}
