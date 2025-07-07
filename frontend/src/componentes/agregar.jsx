import imagen from '../assets/perfilx.png';
import styles from '../paginas/perfil.module.css';

function Agregar({ nombre, descripcion, tecnologias }) {
  return (
    <div className={styles.proyecto}>
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p>{tecnologias}</p>
      <button className={styles.btnVerForm}>Eliminar</button>
  
    </div>
  );
}

export default Sugerencias;