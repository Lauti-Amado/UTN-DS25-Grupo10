import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContenidoInfoPerfil from '../componentes/ContenidoInfoPerfil';
import PerfilesSugeridos from '../componentes/sugerenciasperfiles';
import Editar from '../componentes/editar';
import Proyecto from '../componentes/proyecto'; // Asegurate de importar también el componente de Proyecto
import OfertaCard from '../componentes/ofertaCard';
import '../componentes/ofertaCard.css';
import imagen from '../assets/perfilx.png';
import Compartir from '../componentes/compartir';

export default function Perfil() {
  // modoEditar puede ser null, 'perfil' o 'proyecto'
  const [modoEditar, setModoEditar] = useState(null);

  // Datos del perfil
  const [imagenPerfil, setImagenPerfil] = useState(imagen);
  const [nombrePerfil, setNombrePerfil] = useState('Nombre Perfil');
  const [descripcionPerfil, setDescripcionPerfil] = useState(
    'Soy un estudiante de sistemas con ganas de insertarme en el mundo laboral. Poseo los conocimientos de algunas tecnologías, idiomas y trabajo en equipo.'
  );
  const [FechaNac, setNuevafecha]=useState('')

  // Actualiza datos de perfil
  const manejarActualizarPerfil = (nuevaImagen, nuevoNombre, nuevaDescripcion, nuevaFechaNac) => {
    if (nuevaImagen) setImagenPerfil(nuevaImagen);
    if (nuevoNombre) setNombrePerfil(nuevoNombre);
    if (nuevaDescripcion) setDescripcionPerfil(nuevaDescripcion);
    if(nuevaFechaNac) setNuevafecha(nuevaFechaNac)
    setModoEditar(null);
  };

  // Actualiza datos de proyecto (puedes guardar los datos si querés)
  const manejarActualizarProyecto = (nombreProyecto, descripcionProyecto, tecnologias) => {
    console.log('Proyecto agregado o actualizado:', nombreProyecto, descripcionProyecto, tecnologias);
    setModoEditar(null);
  };

  return (
    <div className="vistaEstirada" style={{ position: 'relative' }}>
      <article>
        <ContenidoInfoPerfil
          onEditarClick={(tipo) => setModoEditar(tipo)} // Recibe 'perfil' o 'proyecto'
          imagen={imagenPerfil}
          nombre={nombrePerfil}
          descripcion={descripcionPerfil}
          FechaNac={FechaNac}
        />
        <PerfilesSugeridos />
      </article>

      {modoEditar && (
        <>
          {/* Fondo oscuro que al hacer click cierra el modal */}
          <div
            onClick={() => setModoEditar(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              zIndex: 1000,
            }}
          />
          {/* Contenedor modal */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              maxWidth: '90%',
              maxHeight: '90%',
              overflowY: 'auto',
            }}
          > 
            {modoEditar === 'perfil' && (
              <Editar
                onCerrar={() => setModoEditar(null)}
                onActualizarPerfil={manejarActualizarPerfil}
                nombre={nombrePerfil}
                descripcion={descripcionPerfil}
                FechaNac={FechaNac}
                imagen={imagenPerfil}
              />
            )}
           
            {modoEditar === 'proyecto' && (
              <Proyecto
                onCerrar={() => setModoEditar(null)}
                onActualizarPerfil={manejarActualizarProyecto}
              />
            )}
            {modoEditar == 'compartir' && (
              <Compartir
               onCerrar={()=> setModoEditar(null)}/>
            )}

            </div>
        </>
      )}
    </div>
  );
}