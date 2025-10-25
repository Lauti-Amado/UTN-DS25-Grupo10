import Carousel from 'react-bootstrap/Carousel';
import OfertaCard from './ofertaCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import datosPostulantes from './datosPostulantes';
import { DatosContexto } from '../datosContext';
import { API_URL } from '../config';

function OfertasCarousel() {
  const [ofertas, setOfertas] = useState([]);
  const [itemsPorSlide, setItemsPorSlide] = useState(3);
  const navigate = useNavigate();
  const { usuarioLogueado } = useContext(DatosContexto);

  // Cargar ofertas o postulantes según el rol
  useEffect(() => {
  const cargarDatos = async () => {
      if (!usuarioLogueado) return;
      try {
        if (usuarioLogueado.rolPostulante) {
          // Obtener todas las ofertas primero
          const resp = await fetch(`${API_URL}/ofertas`);
          const data = await resp.json();
          
          if (data.success) {
            // Para cada oferta, verificar si el usuario está postulado
            const ofertasConPostulacion = await Promise.all(
              data.data.map(async (oferta) => {
                const res = await fetch(`${API_URL}/formularios/${usuarioLogueado.id}/${oferta.id}`);
                const postulacionData = await res.json();
                return postulacionData.existe ? oferta : null;
              })
            );
            
            // Filtrar solo las ofertas donde está postulado
            setOfertas(ofertasConPostulacion.filter(oferta => oferta !== null));
          }
        } else {
          // Lógica existente para empleadores
          const resp = await fetch(`${API_URL}/ofertas/empleador/${usuarioLogueado.id}`);
          const data = await resp.json();
          if (data.success) {
            setOfertas(data.data);
          }
        }
      } catch (err) {
        console.error("Error al cargar ofertas:", err);
        setOfertas([]);
      }
    };
    
    cargarDatos();
  }, [usuarioLogueado]);

  // Ajustar cantidad de items por slide según ancho
  useEffect(() => {
    const actualizarCantidad = () => {
      const ancho = window.innerWidth;
      if (ancho < 576) setItemsPorSlide(1);
      else if (ancho < 768) setItemsPorSlide(2);
      else setItemsPorSlide(3);
    };

    actualizarCantidad();
    window.addEventListener('resize', actualizarCantidad);
    return () => window.removeEventListener('resize', actualizarCantidad);
  }, []);

  // Repetir elementos para completar slides y no dejar espacios vacíos
  const completarOfertas = () => {
    const total = ofertas.length;
    const resto = total % itemsPorSlide;
    if (resto === 0) return ofertas;

    const faltan = itemsPorSlide - resto;
    const extras = ofertas.slice(0, faltan);
    return [...ofertas, ...extras];
  };

  const ofertasCompletas = completarOfertas();

  // Agrupar ofertas en slides
  const ofertasEnSlides = [];
  for (let i = 0; i < ofertasCompletas.length; i += itemsPorSlide) {
    ofertasEnSlides.push(ofertasCompletas.slice(i, i + itemsPorSlide));
  }

  // Redirigir al detalle de la oferta (o trabajos)
  const irAOferta = (index) => {
    navigate('/trabajos', { state: { mensaje: index % ofertas.length } });
  };

  return (
    <div className="carousel-wrapper position-relative">
      
      <Carousel
        className="carrusel-empleos"
        interval={5000}
        indicators={false}
        wrap={true}
        pause="hover"
        prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
        nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
      >
        {ofertasEnSlides.map((grupo, i) => (
          <Carousel.Item key={i}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {grupo.map((oferta, index) => (
                <div
                  key={`${oferta.id}-${i}-${index}`}
                  onClick={() => irAOferta(i * itemsPorSlide + index)}
                >
                  <OfertaCard
                    titulo={oferta.titulo}
                    categoria={oferta.categoria}
                    texto={oferta.descripcion}
                    n={(i * itemsPorSlide + index) % ofertas.length}
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default OfertasCarousel;
