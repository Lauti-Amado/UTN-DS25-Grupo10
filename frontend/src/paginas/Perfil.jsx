import 'bootstrap/dist/css/bootstrap.min.css';
import ContenidoInfoPerfil from '../componentes/ContenidoInfoPerfil';
import PerfilesSugeridos from '../componentes/sugerenciasperfiles';
import styles from './perfil.module.css';

export default function Perfil() {
   
    return (
        <article className={styles.article}>
           <ContenidoInfoPerfil />
           <PerfilesSugeridos/>
        </article>
    );
}