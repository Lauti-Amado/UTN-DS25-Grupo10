import Carousel from 'react-bootstrap/Carousel';
import OfertaCard from './ofertaCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { DatosContexto } from '../datosContext';
import { API_URL } from '../config';
import Card from 'react-bootstrap/Card';

function OfertasCarousel() {
  const [ofertas, setOfertas] = useState([]);
  const [itemsPorSlide, setItemsPorSlide] = useState(3);
  const navigate = useNavigate();
  const { usuarioLogueado } = useContext(DatosContexto);

  // Cargar ofertas, postulantes o usuarios desactivados según el rol
  useEffect(() => {
    const cargarDatos = async () => {
      if (!usuarioLogueado) return;
      
      try {
        if (usuarioLogueado.esAdmin) {
          // Cargar usuarios desactivados para ADMIN
          const token = localStorage.getItem("token");
          const resp = await fetch(`${API_URL}/usuarios`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await resp.json();
          
          if (data.success) {
            const usuariosDesactivados = data.data.filter(u => !u.activo);
            setOfertas(usuariosDesactivados);
          }
        } else if (usuarioLogueado.rolPostulante) {
          // POSTULANTE: Cargar ofertas donde está postulado
          const resp = await fetch(`${API_URL}/ofertas`);
          const data = await resp.json();
          
          if (data.success) {
            const ofertasConPostulacion = await Promise.all(
              data.data.map(async (oferta) => {
                const res = await fetch(`${API_URL}/formularios/${usuarioLogueado.id}/${oferta.id}`);
                const postulacionData = await res.json();
                return postulacionData.existe ? oferta : null;
              })
            );
            
            setOfertas(ofertasConPostulacion.filter(oferta => oferta !== null));
          }
        } else {
          // EMPLEADOR: Cargar sus ofertas
          const resp = await fetch(`${API_URL}/ofertas/empleador/${usuarioLogueado.id}`);
          const data = await resp.json();
          if (data.success) {
            setOfertas(data.data);
          }
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
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

  // Si es admin y no hay usuarios desactivados
  if (usuarioLogueado?.esAdmin && ofertas.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        No hay usuarios desactivados en este momento.
      </div>
    );
  }

  // Si no es admin y no hay ofertas
  if (!usuarioLogueado?.esAdmin && ofertas.length === 0) {
    return (
      <div className="alert alert-warning text-center" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        {usuarioLogueado?.rolPostulante 
          ? "No tienes postulaciones activas." 
          : "No has creado ofertas todavía."}
      </div>
    );
  }

  // Repetir elementos para completar slides
  const completarOfertas = () => {
    const total = ofertas.length;
    const resto = total % itemsPorSlide;
    if (resto === 0) return ofertas;

    const faltan = itemsPorSlide - resto;
    const extras = ofertas.slice(0, faltan);
    return [...ofertas, ...extras];
  };

  const ofertasCompletas = completarOfertas();

  // Agrupar en slides
  const ofertasEnSlides = [];
  for (let i = 0; i < ofertasCompletas.length; i += itemsPorSlide) {
    ofertasEnSlides.push(ofertasCompletas.slice(i, i + itemsPorSlide));
  }

  const irAOferta = (oferta) => {
    navigate('/trabajos', { state: { mensaje: oferta.id, scrollToOferta: true } });
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
              {grupo.map((item, index) => (
                <div key={`${item.id}-${i}-${index}`}>
                  {usuarioLogueado?.esAdmin ? (
                    // Card de usuario desactivado
                    <Card
                      bg={'danger'}
                      style={{ width: '18rem', height: '140px' }}
                      text={'white'}
                      className="mb-2 me-2 card"
                    >
                      <Card.Header className='card-header'>Usuario Desactivado</Card.Header>
                      <Card.Body>
                        <Card.Title className="card-title">{item.nombre}</Card.Title>
                        <Card.Text>
                          {item.mail}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ) : (
                    // Card de oferta normal
                    <div onClick={() => irAOferta(item)} style={{ cursor: 'pointer'}}>
                      <OfertaCard
                        titulo={item.titulo}
                        categoria={item.categoria}
                        texto={item.descripcion}
                        n={item.id}
                      />
                    </div>
                  )}
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