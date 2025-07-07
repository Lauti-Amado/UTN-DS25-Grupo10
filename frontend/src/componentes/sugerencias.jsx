import imagen from '../assets/perfilx.png';
import styles from '../paginas/perfil.module.css';

function Sugerencias({ nombre, imagen }) {

  function mostrarAlerta() {
    alert(`Redirigiéndose al perfil de ${nombre} ...`)
  }
  return (
    <div className={styles.unperfil}>
      <h2>{nombre}</h2>
      <div className={styles.perfil}>
      <button className={styles.btnVerForm} onClick={mostrarAlerta}>Ir al perfil</button>
      <img className={styles.imagenPerfil} src={imagen} alt="imgperfil" /></div>
    </div>
  );
}

export default Sugerencias;
