import React, { use, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContenidoInfoPerfil from '../componentes/ContenidoInfoPerfil';
import PerfilesSugeridos from '../componentes/sugerenciasperfiles';
import Editar from '../componentes/editar';
import Proyecto from '../componentes/proyecto';
import '../componentes/ofertaCard.css';
import imagen from '../assets/perfilx.png';
import Compartir from '../componentes/compartir';
import ListaProyectos from '../componentes/listaproyectos';
import Confirmar from '../componentes/confirmar'
import styles from '../paginas/perfil.module.css';
import Pensamiento from '../componentes/quepensas'
import { DatosContexto } from '../datosContext';
import { useContext, useEffect } from 'react';


export default function Perfil() {
 
  const [modoEditar, setModoEditar] = useState(null);

  const[proyectoaEliminar, setProyectoaEliminar]=useState(null)
  const[mostrarConfirmacion, setMostrarConfirmacion]=useState(false)

  const[modificarProyecto, setModificarProyecto]=useState(null)

  const [imagenPerfil, setImagenPerfil] = useState(imagen);
  const [nombrePerfil, setNombrePerfil] = useState('Nombre Perfil');
  const [descripcionPerfil, setDescripcionPerfil] = useState(
    'Soy un estudiante de sistemas con ganas de insertarme en el mundo laboral. Poseo los conocimientos de algunas tecnologías, idiomas y trabajo en equipo.'
  );
  const [FechaNac, setNuevafecha]=useState('');
  const [proyectosagregados, setProyectosAgregados] = useState([
    {  nombre: "Sistema para una biblioteca", descripcion: "Las funcionalidades son variadas y utiles",
      tecnologias: "Python y SQL Server" },
    {  nombre: "Ta-te-ti", descripcion: "Juego de ta-te-ti con manejo de estados previos",
      tecnologias: "React y tecnologias frontend" },
    {  nombre: "Juego de Ajedrez", descripcion: "Se pueden jugar partidas con un excelente diseño",
      tecnologias: "C++" }
  ]);

  const manejarActualizarPerfil = (nuevaImagen, nuevoNombre, nuevaDescripcion, nuevaFechaNac) => {
    if (nuevaImagen) setImagenPerfil(nuevaImagen);
    if (nuevoNombre) setNombrePerfil(nuevoNombre);
    if (nuevaDescripcion) setDescripcionPerfil(nuevaDescripcion);
    if(nuevaFechaNac) setNuevafecha(nuevaFechaNac);
    setModoEditar(null);
  };

  
  const manejarActualizarProyecto = (nombreProyecto, descripcionProyecto, tecnologias) => {
    console.log('Proyecto agregado o actualizado:', nombreProyecto, descripcionProyecto, tecnologias);
    setModoEditar(null);
  };

 
  const agregarProyecto = (nuevoproy) => {
    setProyectosAgregados([...proyectosagregados,nuevoproy]) 
    setModoEditar(null);
  };

  const SolicitarEliminar=(nombre)=>{
    setProyectoaEliminar(nombre);
    setMostrarConfirmacion(true)
  }

  const CuadroConfirmacion=()=>{
     setProyectosAgregados (proyectosagregados.filter(proyecto => proyecto.nombre !== proyectoaEliminar))
     setMostrarConfirmacion(false)
     setProyectoaEliminar(null)
  }
  
  const Cancelar=()=>{
     setMostrarConfirmacion(false)
     setProyectoaEliminar(null)
  }

  
const AbrirModificarProyecto = (nombre) => {
  const proyecto = proyectosagregados.find(p => p.nombre === nombre);
  if (proyecto) {
    setModificarProyecto(proyecto);         
    setModoEditar('modificarProyecto');     
  }
};

const { usuarioLogueado } = useContext(DatosContexto);


// Actualizar el nombre del perfil cuando cambia el usuario logueado
useEffect(() => {
  if (usuarioLogueado) {
    setNombrePerfil(usuarioLogueado.nombreUsuario); // o usuarioLogueado.nombre según quieras
  }
}, [usuarioLogueado]);


  return (
    <div className="vistaEstirada" style={{ position: 'relative' }}>
      <div className={styles.article}>
        <ContenidoInfoPerfil
          onEditarClick={(tipo) => setModoEditar(tipo)} 
          imagen={imagenPerfil}
          nombre={nombrePerfil}
          descripcion={descripcionPerfil}
          FechaNac={FechaNac}
        />
        <PerfilesSugeridos />
      </div>

      {modoEditar && (
        <>
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
          <div
            style={{
              position: 'fixed',
              top: '58%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              maxWidth: '80%',
              maxHeight: '80%',
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
                onAgregarProyecto={agregarProyecto}
                onActualizarPerfil={manejarActualizarProyecto}
              />
            )}
            {modoEditar === 'compartir' && (
              <Compartir
               onCerrar={()=> setModoEditar(null)}/>
            )}

            {modoEditar === 'verproyectos' && (
              <ListaProyectos
                onCerrar={()=> setModoEditar(null)}
                onEliminar={SolicitarEliminar}
                onModificar={AbrirModificarProyecto}
                onProyectos={proyectosagregados}
              />
            )}
            {modoEditar === 'modificarProyecto' && modificarProyecto && 
            ( <Proyecto nombre={modificarProyecto.nombre} 
            descripcion={modificarProyecto.descripcion} 
            tecnologias={modificarProyecto.tecnologias} 
            onCerrar={() => 
            { setModoEditar('verproyectos'); 
              setModificarProyecto(null); }} 
            onModificarProyecto= {(nuevoNombre, nuevaDescripcion, nuevasTecnologias) => 
              { setProyectosAgregados(proyectosagregados.map
            (p => p.nombre === modificarProyecto.nombre ? { nombre: nuevoNombre, descripcion: nuevaDescripcion, 
              tecnologias: nuevasTecnologias } : p )); 
            setModificarProyecto(null); setModoEditar('verproyectos'); }} /> )}

          </div>
        </>
      )}
        
          {mostrarConfirmacion && (
  <>
    <div
      onClick={Cancelar}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        zIndex: 1100, 
      }}
    />
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1101,
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        maxWidth: '90%',
        maxHeight: '90%',
        overflowY: 'auto',
      }}
    >
      <Confirmar
        onCancelar={Cancelar}
        onAceptar={CuadroConfirmacion}
      />
    </div>
  </>
)}
      <Pensamiento/>
</div>
  );
}