import imagen from '../assets/perfilx.png';
import Sugerencias from './sugerencias';
import styles from '../paginas/perfil.module.css';
import { useEffect , useState } from 'react';
import { getToken } from '../helpers/auth';

function PerfilesSugeridos(){
    const perfiles=[
      {id:1, nombre:"Juan Perez", imagen:imagen},
      {id:2, nombre:"Muriel Cruz", imagen:imagen},
      {id:3, nombre:"Celeste Mumbulsen", imagen:imagen},
      {id:4, nombre:"Eliodoro Smith", imagen:imagen},
      {id:5, nombre:"Casey Baker", imagen:imagen},
      {id:6, nombre:"Martina Vidal", imagen:imagen},
    ];
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      const obtenerUsuarios = async () => {
        try {
          const response = await fetch("http://localhost:3000/usuarios/getAllUsuarios", {
            method: "GET",
            headers: { "Content-Type": "application/json",
                       "Authorization": "Bearer " + getToken(),
            },
            credentials: "include"
          });

          const data = await response.json();

          setUsuarios(data);
        } catch (error) {
          console.error("Error al mostrar los usuarios sugeridos:", error);
        }
      };
      obtenerUsuarios();
    }, []);


    return (
      <div className={styles.scrollsection}>
          <h2>Perfiles sugeridos</h2>
          <div className={styles.scrollcontent}>
            {usuarios.map(({nombreUsuario, fotoPerfil})=>(
              <Sugerencias nombre={nombreUsuario} imagen={fotoPerfil}/>
            ))}
          </div>
      </div>
    );

};

export default PerfilesSugeridos;