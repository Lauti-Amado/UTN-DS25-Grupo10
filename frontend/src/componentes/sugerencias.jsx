import imagen from '../assets/perfilx.png';
import styles from '../paginas/perfil.module.css';

function Sugerencias({id, nombreUsuario, fotoPerfil}) {
    const click = () => {
    alert('Aun no existen estos perfiles por falta del back');
  };
   

  return (
    <div className={styles.unperfil}>
      <h2>{nombreUsuario}</h2>
      <div className={styles.perfil}>
      <button action onClick={click} className={styles.btnVerForm}>Ir al perfil</button>
      <img className={styles.imagenPerfil} src={imagen} alt="imgperfil" /></div>
    </div>
  );
}


export default Sugerencias;
