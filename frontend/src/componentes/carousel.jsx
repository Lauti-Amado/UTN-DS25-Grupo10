import Carousel from 'react-bootstrap/Carousel';
import OfertaCard from './ofertaCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import datosEmpleosIniciales from './datosIniciales';
import datosPostulantes from './datosPostulantes';
import { DatosContexto } from '../datosContext';

function OfertasCarousel() {
  const [ofertas, setOfertas] = useState([]);
  const [itemsPorSlide, setItemsPorSlide] = useState(3);
  const navigate = useNavigate();
  const { usuarioLogueado } = useContext(DatosContexto);


  useEffect(() => {
    if (usuarioLogueado?.rol === "empleador") {
      // Si es empleador, se usan los postulantes
      const postulantesConvertidos = datosPostulantes.map((p, index) => ({
        id: index,
        titulo: `${p.nombre} ${p.apellido}`,
        categoria: p.puesto,
        contenido: `Postulante para el puesto de ${p.puesto}`
      }));
      setOfertas(postulantesConvertidos);
    } else {
      // Si no es empleador, mostrar empleos desde localStorage o iniciales
      const data = localStorage.getItem('empleos');
      if (data) {
        setOfertas(JSON.parse(data));
      } else {
        localStorage.setItem('empleos', JSON.stringify(datosEmpleosIniciales));
        setOfertas(datosEmpleosIniciales);
      }
    }
  }, [usuarioLogueado]);


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

 
  const completarOfertas = () => {
    const total = ofertas.length;
    const resto = total % itemsPorSlide;
    if (resto === 0) return ofertas;

    const faltan = itemsPorSlide - resto;
    const extras = ofertas.slice(0, faltan);
    return [...ofertas, ...extras];
  };

  const ofertasCompletas = completarOfertas();

  const ofertasEnSlides = [];
  for (let i = 0; i < ofertasCompletas.length; i += itemsPorSlide) {
    const grupo = ofertasCompletas.slice(i, i + itemsPorSlide);
    ofertasEnSlides.push(grupo);
  }

 
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
                <div key={`${oferta.id}-${i}-${index}`} onClick={() => irAOferta(i * itemsPorSlide + index)}>
                  <OfertaCard
                    titulo={oferta.titulo}
                    categoria={oferta.categoria}
                    texto={oferta.contenido}
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
