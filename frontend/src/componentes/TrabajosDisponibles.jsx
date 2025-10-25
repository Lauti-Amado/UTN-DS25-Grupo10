import React, {useState, useEffect} from 'react';
import TrabajoCard from './TrabajoCard';
import './TrabajosDisponibles.css';
import FormularioPostulacionModal from './FormularioPostulacionModal';


const TrabajosDisponibles = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerTrabajos = async () => {
      try {
        const token = localStorage.getItem('token');
        const usuarioId = localStorage.getItem('usuarioID');
        const response = await fetch (`${API_URL}/ofertas`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), 
          },
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();

        //Filtrar las ofertas donde NO está postulado
        const trabajosFiltrados = await Promise.all(
           data.data.map(async (trabajo) => {
            const res = await fetch(`${API_URL}/formularios/${usuarioId}/${trabajo.id}`);
            const postulacionData = await res.json();
            return !postulacionData.existe ? trabajo : null;
          })
        );

        setTrabajos(trabajosFiltrados.filter((trabajo) => trabajo !== null));
      } catch (error) {
        console.error('Error al obtener las ofertas:', error);
      }
    };

    obtenerTrabajos();
  }, []);

//Modificar para redireccionar en vez de abrir modal
  const abrirFormulario = (trabajo) => {
    navigate('/trabajos', { 
      state: { 
        mensaje: trabajo.id, // ID de la oferta para abrir el acordeón
        scrollToOferta: true // Flag para indicar que debe scrollear
      } 
    });
  };

  return (
    <div className="trabajos-container container">
      <h2 className="section-title ">Trabajos Disponibles</h2>
      <div className="scroll-box">
        <div className="trabajos-grid">
          {trabajos.length > 0 ? (
            trabajos.map((trabajo, index) => (
              <TrabajoCard
                key={index}
                EsTrabajo={true}
                titulo={trabajo.titulo}
                sueldo={trabajo.sueldo ? `$${trabajo.sueldo}` : 'A convenir'}
                rol={trabajo.rol || ''}
                imagen={trabajo.imagen || 'https://cdn-icons-png.flaticon.com/512/4201/4201973.png'}
                onPostular={() => abrirFormulario(trabajo)}
              />
            ))
          ) : (
            <p>No hay trabajos disponibles por el momento.</p>
          )}
        </div>
      </div>
      <FormularioPostulacionModal
        show={modalVisible}
        handleClose={() => setModalVisible(false)}
        trabajo={trabajoSeleccionado}
      />
    </div>
  );
};

export default TrabajosDisponibles;