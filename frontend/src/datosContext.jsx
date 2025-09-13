import { createContext, useState, useEffect } from "react";

export const DatosContexto = createContext();

export function DatosProvider({ children }) {
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const guardado = localStorage.getItem("usuarioLogueado");
    return guardado ? JSON.parse(guardado) : null;
  });

  const [busquedaGlobal, setBusquedaGlobal] = useState("");

  useEffect(() => {
    if (usuarioLogueado) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
    } else {
      localStorage.removeItem("usuarioLogueado");
    }
  }, [usuarioLogueado]);

  return (
    <DatosContexto.Provider
      value={{
        usuarioLogueado,
        setUsuarioLogueado,
        busquedaGlobal,
        setBusquedaGlobal,
      }}
    >
      {children}
    </DatosContexto.Provider>
  );
}