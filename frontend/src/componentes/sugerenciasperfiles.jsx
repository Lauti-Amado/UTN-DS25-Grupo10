import imagen from '../assets/perfilx.png';
import Sugerencias from './sugerencias';
import styles from '../paginas/perfil.module.css';

function PerfilesSugeridos(){
    const perfiles=[
      {id:1, nombre:"Juan Perez", imagen:imagen},
      {id:2, nombre:"Muriel Cruz", imagen:imagen},
      {id:3, nombre:"Celeste Mumbulsen", imagen:imagen},
      {id:4, nombre:"Eliodoro Smith", imagen:imagen},
      {id:5, nombre:"Casey Baker", imagen:imagen},
      {id:6, nombre:"Martina Vidal", imagen:imagen},
    ];

    return (
      <div className={styles['scroll-section']}>
          <h2>Perfiles sugeridos</h2>
          <div className={styles['scroll-content']}>
            {perfiles.map(({id, nombre, imagen})=>(
              <Sugerencias key={id} nombre={nombre} imagen={imagen}/>
            ))}
          </div>
      </div>
    );

};

export default PerfilesSugeridos;