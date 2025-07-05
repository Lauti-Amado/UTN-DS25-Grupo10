import imagen from '../assets/perfilx.png';
import styles from '../paginas/perfil.module.css';

function Sugerencias({ nombre, imagen }) {
  return (
    <div className={styles.unperfil}>
      <h2>{nombre}</h2>
      <div className={styles.perfil}>
      <button className={styles.btnVerForm}>Ir al perfil</button>
      <img className={styles.imagenPerfil} src={imagen} alt="imgperfil" /></div>
    </div>
  );
}

export default Sugerencias;
