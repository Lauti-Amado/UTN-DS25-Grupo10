import { createContext, useState, useEffect } from 'react';

export const DatosContexto = createContext();

export function DatosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => {
    const datosGuardados = localStorage.getItem('usuarios');
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : [
          { id: 0, nombre: "Lauti", usuario: "Lautarito1", email: "lau@gmail.com", contraseña: "123", rol: "empleador", fnac:"28-12-2004"},
          { id: 1, nombre: "Juan Cruz", usuario: "Juancito1", email: "juan@gmail.com", contraseña: "456", rol: "postulante", fnac:"13-09-2004"},
          { id: 2, nombre: "Yamil", usuario: "Yama107", email: "yamiltundis6@gmail.com", contraseña: "8494", rol: "postulante", fnac:"10-07-2004"},
          { id: 3, nombre: "administrador", usuario: "admin", email: "admin@gmail.com", contraseña: "admin123", rol: "administrador", fnac:"01-01-2004"},
          { id: 5, nombre: "pepe", usuario: "pepe", email: "pepe@gmail.com", contraseña: "pepe123", rol: "postulante", fnac:"05-01-2004"},
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
