import { createContext, useState, useEffect } from 'react';

export const DatosContexto = createContext();

export function DatosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => {
    const datosGuardados = localStorage.getItem('usuarios');
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : [
          { id: 0, nombre: "Lauti", usuario: "Lautarito1", email: "lau@gmail.com", contraseña: "123", rol: "empleador" },
          { id: 1, nombre: "Juan Cruz", usuario: "Juancito1", email: "juan@gmail.com", contraseña: "456", rol: "postulante"},
        ];
  });

  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');

  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      setUsuarioLogueado(JSON.parse(usuarioGuardado));
    }
  }, []);

  useEffect(() => {
    if (usuarioLogueado) {
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
    } else {
      localStorage.removeItem('usuarioLogueado');
    }
  }, [usuarioLogueado]);

  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios(prev => [...prev, { ...nuevoUsuario, id: Date.now() }]);
  };

  const eliminarUsuario = (id) => {
    setUsuarios(prev => prev.filter(user => user.id !== id));
  };

  return (
    <DatosContexto.Provider
      value={{
        usuarios,
        setUsuarios,
        usuarioLogueado,
        setUsuarioLogueado,
        busquedaGlobal,
        setBusquedaGlobal,
        agregarUsuario,
        eliminarUsuario,
      }}
    >
      {children}
    </DatosContexto.Provider>
  );
}
