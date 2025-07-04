import {createContext,useState,useEffect} from 'react'
export const DatosContexto = createContext();

export function DatosProvider ({children}){
    const [usuarios, setUsuarios]=useState([
        {id:0,nombre:"Lauti",usuario:"Lautarito1",email:"lau@gmail.com",contraseña:"123",rol:"empleador"},
        {id:1,nombre:"Juan Cruz",usuario:"Juancito1",email:"juan@gmail.com",contraseña:"456",rol:"postulante"},
        
    
    ]);

    const [usuarioLogueado, setUsuarioLogueado] = useState(null); // nuevo estado

      // Recuperar usuario guardado al cargar la app
        useEffect(() => {
            const usuarioGuardado = localStorage.getItem('usuarioLogueado');
            if (usuarioGuardado) {
            setUsuarioLogueado(JSON.parse(usuarioGuardado));
            }
        }, []);

        // Guardar en localStorage cada vez que cambia
        useEffect(() => {
            if (usuarioLogueado) {
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
            } else {
            localStorage.removeItem('usuarioLogueado');
            }
        }, [usuarioLogueado]);

    return (
        <DatosContexto.Provider value={{usuarios,setUsuarios, usuarioLogueado, setUsuarioLogueado}}>
            {children}
        </DatosContexto.Provider>
    );
}